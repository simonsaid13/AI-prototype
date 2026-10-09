import * as Clipboard from 'expo-clipboard';
import { useState, type ReactNode } from 'react';
import { View } from 'react-native';

import { AssistantMessage, ChatInput, IntroHero, SuggestionChips, TypingDots, UserMessage } from '@/components/chat';
import {
  AppText,
  Backdrop,
  Button,
  Glass,
  GlassButton,
  Icon,
  IconButton,
  iconNames,
  type IconName,
  PressScale,
  Screen,
  showToast,
  TextField,
  ToastBubble,
} from '@/components/ui';
import type { Rating } from '@/store/chats';
import { useTheme } from '@/theme';
import { typography, type TypographyVariant } from '@/theme/typography';

// Every component in src/components must have an entry here, so it shows on the Design System page.
// The first state doubles as the list thumbnail.

export const groups = ['Basics', 'Buttons', 'Inputs', 'Surfaces', 'Feedback', 'Chat'] as const;
export type Group = (typeof groups)[number];

export type CatalogState = {
  label: string;
  render: () => ReactNode;
  backdrop?: boolean;
  // For parts that already add the screen side padding themselves.
  edgeToEdge?: boolean;
};

export type CatalogEntry = {
  id: string;
  name: string;
  group: Group;
  description: string;
  keywords?: string[];
  states: CatalogState[];
};

const SAMPLE_ANSWER = 'You can top up your balance in the Azercell app or with any bank card.';

function Row({ children }: { children: ReactNode }) {
  const { spacing } = useTheme();
  return <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacing.md }}>{children}</View>;
}

function Box({ children }: { children: ReactNode }) {
  const { colors, spacing, radius } = useTheme();
  return (
    <View style={{ backgroundColor: colors.surfaceMuted, borderRadius: radius.md, padding: spacing.lg, alignItems: 'center' }}>
      {children}
    </View>
  );
}

function GlassButtonSwap() {
  const [open, setOpen] = useState(false);
  return (
    <GlassButton icon={open ? 'back' : 'menu'} accessibilityLabel="Swap icon" onPress={() => setOpen((v) => !v)} />
  );
}

function TextFieldDemo({ initial = '', editable }: { initial?: string; editable?: boolean }) {
  const [value, setValue] = useState(initial);
  return <TextField value={value} onChangeText={setValue} placeholder="Type something" editable={editable} />;
}

function ChatInputDemo({ initialText = '', initialBusy = false }: { initialText?: string; initialBusy?: boolean }) {
  const [text, setText] = useState(initialText);
  const [busy, setBusy] = useState(initialBusy);
  return (
    <ChatInput value={text} onChangeText={setText} onSend={() => setText('')} onStop={() => setBusy(false)} busy={busy} />
  );
}

function AssistantMessageDemo({ initialRating }: { initialRating?: Rating }) {
  const [rating, setRating] = useState<Rating | undefined>(initialRating);
  return (
    <AssistantMessage
      text={SAMPLE_ANSWER}
      time="5 min. ago"
      pending={false}
      done
      rating={rating}
      onRate={(value) => setRating((current) => (current === value ? undefined : value))}
      onCopy={async () => {
        await Clipboard.setStringAsync(SAMPLE_ANSWER);
        showToast('Copied');
      }}
    />
  );
}

export const catalog: CatalogEntry[] = [
  {
    id: 'app-text',
    name: 'AppText',
    group: 'Basics',
    description: 'Text in the app font. Pick a style and a color from the theme.',
    keywords: ['typography', 'font', 'label', 'title', 'heading', 'caption'],
    states: (Object.keys(typography) as TypographyVariant[]).map((variant) => ({
      label: variant,
      render: () => <AppText variant={variant}>Azercell assistant</AppText>,
    })),
  },
  {
    id: 'icon',
    name: 'Icon',
    group: 'Basics',
    description: 'Icons from the Figma file. Tinted with any color.',
    keywords: ['svg', 'glyph', 'symbol'],
    states: [
      {
        label: 'All icons',
        render: () => (
          <Row>
            {iconNames.map((name) => (
              <ThemedIcon key={name} name={name} />
            ))}
          </Row>
        ),
      },
      {
        label: 'All icons, with names',
        render: () => (
          <Row>
            {iconNames.map((name) => (
              <View key={name} style={{ alignItems: 'center', width: 72, gap: 4 }}>
                <ThemedIcon name={name} />
                <AppText variant="caption" color="textSecondary">
                  {name}
                </AppText>
              </View>
            ))}
          </Row>
        ),
      },
      {
        label: 'Sizes 16, 24, 32',
        render: () => (
          <Row>
            <ThemedIcon name="plus" size={16} />
            <ThemedIcon name="plus" size={24} />
            <ThemedIcon name="plus" size={32} />
          </Row>
        ),
      },
      {
        label: 'Primary color',
        render: () => <ThemedIcon name="thumbsUpFilled" primary />,
      },
    ],
  },
  {
    id: 'button',
    name: 'Button',
    group: 'Buttons',
    description: 'Pill button with a text label. Primary or secondary.',
    keywords: ['cta', 'action', 'primary', 'secondary', 'loading', 'disabled'],
    states: [
      { label: 'Primary', render: () => <Button label="Continue" onPress={() => showToast('Button pressed')} /> },
      {
        label: 'Secondary',
        render: () => <Button label="Cancel" variant="secondary" onPress={() => showToast('Button pressed')} />,
      },
      { label: 'Loading', render: () => <Button label="Continue" loading /> },
      { label: 'Disabled', render: () => <Button label="Continue" disabled /> },
    ],
  },
  {
    id: 'icon-button',
    name: 'IconButton',
    group: 'Buttons',
    description: 'Round button with one Ionicons icon. Filled or see-through.',
    keywords: ['ionicons', 'round', 'filled', 'ghost'],
    states: [
      {
        label: 'Filled',
        render: () => <IconButton icon="add" variant="filled" accessibilityLabel="Add" onPress={() => showToast('Pressed')} />,
      },
      {
        label: 'Ghost',
        render: () => <IconButton icon="heart-outline" accessibilityLabel="Like" onPress={() => showToast('Pressed')} />,
      },
      {
        label: 'Small (32)',
        render: () => <IconButton icon="add" variant="filled" size={32} accessibilityLabel="Add" onPress={() => {}} />,
      },
      { label: 'Disabled', render: () => <IconButton icon="add" variant="filled" accessibilityLabel="Add" disabled /> },
    ],
  },
  {
    id: 'glass-button',
    name: 'GlassButton',
    group: 'Buttons',
    description: 'Round glass button from the top bar. The icon fades when it changes.',
    keywords: ['navbar', 'header', 'liquid glass', 'menu', 'close', 'back'],
    states: [
      {
        label: 'Default',
        backdrop: true,
        render: () => <GlassButton icon="menu" accessibilityLabel="Menu" onPress={() => showToast('Pressed')} />,
      },
      {
        label: 'Primary icon',
        backdrop: true,
        render: () => <PrimaryGlassButton />,
      },
      {
        label: 'Tap to swap the icon',
        backdrop: true,
        render: () => <GlassButtonSwap />,
      },
      {
        label: 'Not tappable yet',
        backdrop: true,
        render: () => <GlassButton icon="more" accessibilityLabel="More options" />,
      },
    ],
  },
  {
    id: 'press-scale',
    name: 'PressScale',
    group: 'Buttons',
    description: 'Wrapper that shrinks a little when pressed. Gives any block tap feedback.',
    keywords: ['tap', 'touch', 'feedback', 'pressable', 'scale'],
    states: [
      {
        label: 'Press and hold',
        render: () => (
          <PressScale onPress={() => {}}>
            <Box>
              <AppText variant="bodySmall">Press and hold me</AppText>
            </Box>
          </PressScale>
        ),
      },
    ],
  },
  {
    id: 'text-field',
    name: 'TextField',
    group: 'Inputs',
    description: 'One-line text input with a border.',
    keywords: ['input', 'form', 'search', 'type'],
    states: [
      { label: 'Empty', render: () => <TextFieldDemo /> },
      { label: 'Filled', render: () => <TextFieldDemo initial="Valentyn" /> },
      { label: 'Not editable', render: () => <TextFieldDemo initial="Read only" editable={false} /> },
    ],
  },
  {
    id: 'chat-input',
    name: 'ChatInput',
    group: 'Inputs',
    description: 'Message box at the bottom of the chat. The round button turns into send or stop.',
    keywords: ['composer', 'message', 'send', 'stop', 'voice', 'mic'],
    states: [
      { label: 'Empty (voice button)', backdrop: true, edgeToEdge: true, render: () => <ChatInputDemo /> },
      { label: 'With text (send button)', backdrop: true, edgeToEdge: true, render: () => <ChatInputDemo initialText="How do I top up?" /> },
      { label: 'Answering (stop button)', backdrop: true, edgeToEdge: true, render: () => <ChatInputDemo initialBusy /> },
    ],
  },
  {
    id: 'glass',
    name: 'Glass',
    group: 'Surfaces',
    description: 'Liquid glass surface on iOS 26. See-through white elsewhere.',
    keywords: ['blur', 'liquid glass', 'card', 'surface'],
    states: [
      {
        label: 'Default',
        backdrop: true,
        render: () => <GlassCard />,
      },
      {
        label: 'Reacts to touch (iOS 26)',
        backdrop: true,
        render: () => <GlassCard interactive />,
      },
    ],
  },
  {
    id: 'backdrop',
    name: 'Backdrop',
    group: 'Surfaces',
    description: 'Soft color background shared by every screen.',
    keywords: ['background', 'gradient', 'image', 'wallpaper'],
    states: [
      {
        label: 'Default',
        render: () => (
          <View style={{ height: 200, alignSelf: 'stretch' }}>
            <Backdrop />
          </View>
        ),
      },
    ],
  },
  {
    id: 'screen',
    name: 'Screen',
    group: 'Surfaces',
    description: 'Plain page wrapper that keeps content away from the notch and edges.',
    keywords: ['page', 'safe area', 'container', 'layout'],
    states: [
      {
        label: 'Default',
        render: () => (
          <View style={{ height: 120, alignSelf: 'stretch' }}>
            <Screen>
              <AppText variant="bodySmall">Content inside Screen</AppText>
            </Screen>
          </View>
        ),
      },
    ],
  },
  {
    id: 'toast',
    name: 'Toast',
    group: 'Feedback',
    description: 'Short dark message at the top that hides by itself.',
    keywords: ['snackbar', 'notification', 'alert', 'message', 'showToast'],
    states: [
      { label: 'Bubble', render: () => <ToastBubble message="Copied" /> },
      { label: 'Show it for real', render: () => <Button label="Show toast" onPress={() => showToast('This is a toast')} /> },
    ],
  },
  {
    id: 'typing-dots',
    name: 'TypingDots',
    group: 'Feedback',
    description: 'Three bouncing dots while the AI is writing.',
    keywords: ['loading', 'typing', 'indicator', 'pending'],
    states: [{ label: 'Default', render: () => <TypingDots /> }],
  },
  {
    id: 'user-message',
    name: 'UserMessage',
    group: 'Chat',
    description: 'Purple bubble on the right for what the user wrote.',
    keywords: ['bubble', 'message', 'chat', 'sent'],
    states: [
      { label: 'Short', edgeToEdge: true, render: () => <UserMessage text="Top up" time="now" /> },
      {
        label: 'Long',
        edgeToEdge: true,
        render: () => (
          <UserMessage text="Which tariff gives me the most internet for under 20 manat a month?" time="3 min. ago" />
        ),
      },
    ],
  },
  {
    id: 'assistant-message',
    name: 'AssistantMessage',
    group: 'Chat',
    description: 'AI answer with avatar, rating, copy and error states.',
    keywords: ['bubble', 'message', 'chat', 'ai', 'rating', 'feedback', 'error', 'retry'],
    states: [
      { label: 'Answer (tap the thumbs)', edgeToEdge: true, render: () => <AssistantMessageDemo /> },
      { label: 'Typing', edgeToEdge: true, render: () => <AssistantMessage text="" time="now" pending done={false} onRate={() => {}} onCopy={() => {}} /> },
      { label: 'Rated good', edgeToEdge: true, render: () => <AssistantMessageDemo initialRating="up" /> },
      { label: 'Rated bad', edgeToEdge: true, render: () => <AssistantMessageDemo initialRating="down" /> },
      {
        label: 'Error with retry',
        edgeToEdge: true,
        render: () => (
          <AssistantMessage
            text=""
            time="now"
            pending={false}
            done={false}
            error="Could not reach the server."
            onRate={() => {}}
            onCopy={() => {}}
            onRetry={() => showToast('Try again pressed')}
          />
        ),
      },
    ],
  },
  {
    id: 'suggestion-chips',
    name: 'SuggestionChips',
    group: 'Chat',
    description: 'Quick question pills above the input on the start screen.',
    keywords: ['chips', 'pills', 'quick reply', 'suggestions'],
    states: [
      {
        label: 'Default',
        edgeToEdge: true,
        render: () => (
          <SuggestionChips items={['Top up', 'Activate tariff', 'Recommend MIP']} onPick={(text) => showToast(`Picked: ${text}`)} />
        ),
      },
    ],
  },
  {
    id: 'intro-hero',
    name: 'IntroHero',
    group: 'Chat',
    description: 'Azercell logo and greeting on the empty chat screen.',
    keywords: ['hero', 'welcome', 'greeting', 'logo', 'empty state'],
    states: [{ label: 'Default', render: () => <IntroHero name="Valentyn" /> }],
  },
];

function ThemedIcon({ name, size, primary }: { name: IconName; size?: number; primary?: boolean }) {
  const { colors } = useTheme();
  return <Icon name={name} size={size} color={primary ? colors.primary : colors.textPrimary} />;
}

function PrimaryGlassButton() {
  const { colors } = useTheme();
  return <GlassButton icon="plus" iconColor={colors.primary} accessibilityLabel="New chat" onPress={() => showToast('Pressed')} />;
}

function GlassCard({ interactive }: { interactive?: boolean }) {
  const { spacing, radius } = useTheme();
  return (
    <Glass interactive={interactive} style={{ borderRadius: radius.lg, padding: spacing.xl, alignItems: 'center' }}>
      <AppText variant="bodySmall">Glass surface</AppText>
    </Glass>
  );
}

export function searchCatalog(query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return catalog;
  return catalog.filter((entry) => {
    const text = [entry.name, entry.group, entry.description, ...(entry.keywords ?? []), ...entry.states.map((s) => s.label)]
      .join(' ')
      .toLowerCase();
    return words.every((word) => text.includes(word));
  });
}
