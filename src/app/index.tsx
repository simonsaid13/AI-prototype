import { useChat } from '@ai-sdk/react';
import { generateId } from 'ai';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { KeyboardChatScrollView, KeyboardStickyView, useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeInDown, FadeOut, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { chatTransport, messageText } from '@/api/chat';
import { sendFeedback } from '@/api/feedback';
import { AssistantMessage, ChatInput, IntroHero, SuggestionChips, UserMessage } from '@/components/chat';
import { Backdrop, GlassButton, showToast } from '@/components/ui';
import { useNow } from '@/hooks/useNow';
import { useChats, type ChatMessage, type Rating } from '@/store/chats';
import { useTheme } from '@/theme';
import { timeAgo } from '@/utils/time';

const USER_NAME = 'Valentyn';
const SUGGESTIONS = ['Top up', 'Activate tariff', 'Recommend MIP'];
const HEADER_BUTTON = 38;
const INPUT_HEIGHT = 56;
const NEW_MESSAGE_MS = 1500;

const introIn = FadeIn.duration(250);
const introOut = FadeOut.duration(180);
const messageIn = FadeInDown.duration(260);

export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  const insets = useSafeAreaInsets();

  const currentId = useChats((s) => s.currentId);
  const savedChat = useChats((s) => (currentId ? s.chats[currentId] : undefined));
  const [draftId, setDraftId] = useState(generateId);
  const chatId = currentId ?? draftId;

  const { messages, sendMessage, status, error, stop, regenerate } = useChat<ChatMessage>({
    id: chatId,
    messages: useChats.getState().chats[chatId]?.messages ?? [],
    transport: chatTransport,
    throttle: 50,
  });

  const [input, setInput] = useState('');
  const now = useNow();
  const busy = status === 'submitted' || status === 'streaming';
  const inChat = messages.length > 0;

  useEffect(() => {
    if (status === 'streaming' || messages.length === 0) return;
    useChats.getState().saveMessages(chatId, messages);
  }, [chatId, messages, status]);

  const scrollRef = useRef<Animated.ScrollView>(null);
  const stickToEnd = useRef(true);
  const extraPadding = useSharedValue(0);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    if (!currentId) useChats.getState().startChat(chatId, text);
    stickToEnd.current = true;
    sendMessage({ text, metadata: { createdAt: Date.now() } });
    setInput('');
  };

  const leaveChat = () => {
    stop();
    setInput('');
    useChats.getState().selectChat(null);
    setDraftId(generateId());
  };

  const rate = (message: ChatMessage, index: number, value: Rating) => {
    const next = savedChat?.ratings[message.id] === value ? null : value;
    useChats.getState().setRating(chatId, message.id, next);
    if (next) showToast('Thanks for your feedback! We will share it with the team.');
    const question = messages[index - 1]?.role === 'user' ? messageText(messages[index - 1]) : '';
    sendFeedback({ chatId, messageId: message.id, rating: next, question, answer: messageText(message) }).catch(() =>
      showToast('Feedback was not sent. Check the server connection.'),
    );
  };

  const copy = async (message: ChatMessage) => {
    await Clipboard.setStringAsync(messageText(message));
    showToast('Copied');
  };

  const onInputLayout = (e: LayoutChangeEvent) => {
    extraPadding.set(Math.max(0, e.nativeEvent.layout.height - INPUT_HEIGHT));
  };

  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();
  const heroStyle = useAnimatedStyle(() => ({ transform: [{ translateY: keyboardHeight.get() / 2 }] }));

  const headerTop = insets.top + spacing.sm;
  const listTop = headerTop + HEADER_BUTTON + spacing.lg;
  const bottomGap = Math.max(insets.bottom, spacing.lg);
  const listBottom = INPUT_HEIGHT + bottomGap + spacing.lg;
  const lastIndex = messages.length - 1;

  return (
    <View style={[styles.fill, { backgroundColor: colors.background }]}>
      <Backdrop />

      {inChat ? (
        <Animated.View key={chatId} entering={introIn} exiting={introOut} style={styles.fill}>
          <KeyboardChatScrollView
            ref={scrollRef}
            keyboardLiftBehavior="whenAtEnd"
            offset={bottomGap - spacing.sm}
            extraContentPadding={extraPadding}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingTop: listTop, paddingBottom: listBottom }}
            onScrollBeginDrag={() => {
              stickToEnd.current = false;
            }}
            onEndVisible={(visible) => {
              if (visible) stickToEnd.current = true;
            }}
            onContentSizeChange={() => {
              if (stickToEnd.current) scrollRef.current?.scrollToEnd({ animated: true });
            }}
          >
            {messages.map((message, index) => {
              const createdAt = message.metadata?.createdAt ?? now;
              const time = timeAgo(createdAt, now);
              const isLast = index === lastIndex;
              // Only a message the user just sent slides in. AI replies take over the typing
              // placeholder's spot, and history opened from the menu is already there.
              const animate = message.role === 'user' && createdAt > now - NEW_MESSAGE_MS;
              return (
                <Animated.View key={message.id} entering={animate ? messageIn : undefined}>
                  {message.role === 'user' ? (
                    <UserMessage text={messageText(message)} time={time} />
                  ) : (
                    <AssistantMessage
                      text={messageText(message)}
                      time={time}
                      pending={isLast && busy}
                      done={!(isLast && busy)}
                      rating={savedChat?.ratings[message.id]}
                      error={isLast && error ? error.message : undefined}
                      onRate={(value) => rate(message, index, value)}
                      onCopy={() => copy(message)}
                      onRetry={isLast && error ? () => regenerate() : undefined}
                    />
                  )}
                </Animated.View>
              );
            })}
            {status === 'submitted' && messages[lastIndex]?.role === 'user' ? (
              <Animated.View entering={messageIn}>
                <AssistantMessage text="" time="now" pending done={false} onRate={() => {}} onCopy={() => {}} />
              </Animated.View>
            ) : null}
            {error && messages[lastIndex]?.role === 'user' ? (
              <AssistantMessage
                text=""
                time="now"
                pending={false}
                done={false}
                error={error.message}
                onRate={() => {}}
                onCopy={() => {}}
                onRetry={() => regenerate()}
              />
            ) : null}
          </KeyboardChatScrollView>
        </Animated.View>
      ) : (
        <Animated.View
          key="intro"
          entering={introIn}
          exiting={introOut}
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.center]}
        >
          <Animated.View style={heroStyle}>
            <IntroHero name={USER_NAME} />
          </Animated.View>
        </Animated.View>
      )}

      <View
        pointerEvents="box-none"
        style={[
          styles.header,
          {
            paddingTop: headerTop,
            paddingHorizontal: spacing.gutter,
            paddingBottom: spacing.lg,
            experimental_backgroundImage: `linear-gradient(to bottom, ${colors.background} 55%, ${colors.background}00)`,
          },
        ]}
      >
        {inChat ? (
          <GlassButton icon="back" accessibilityLabel="Back" onPress={leaveChat} />
        ) : (
          <GlassButton icon="menu" accessibilityLabel="Open chat history" onPress={() => router.push('/menu')} />
        )}
        {inChat ? (
          <GlassButton icon="more" accessibilityLabel="More options" />
        ) : (
          <GlassButton icon="close" accessibilityLabel="Close assistant" />
        )}
      </View>

      <KeyboardStickyView offset={{ closed: 0, opened: bottomGap - spacing.sm }} style={styles.bottom}>
        {!inChat ? (
          <Animated.View entering={introIn} exiting={introOut} style={{ paddingBottom: spacing.lg }}>
            <SuggestionChips items={SUGGESTIONS} onPick={send} />
          </Animated.View>
        ) : null}
        <View
          style={{
            paddingBottom: bottomGap,
            experimental_backgroundImage: `linear-gradient(to bottom, ${colors.background}00 0%, ${colors.backgroundTint} 46%)`,
          }}
        >
          <ChatInput
            value={input}
            onChangeText={setInput}
            onSend={() => send(input)}
            onStop={stop}
            busy={busy}
            onLayout={onInputLayout}
          />
        </View>
      </KeyboardStickyView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
