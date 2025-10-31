// Onboarding carousel screen with 3 slides

import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import type { AnimatedScrollView } from 'react-native-reanimated';
import { OnboardingSlide } from '@/components/onboarding/OnboardingSlide';
import {
  CaptureIllustration,
  WallpaperIllustration,
  CollectionIllustration,
} from '@/components/onboarding/OnboardingIllustrations';
import { PaginationDots } from '@/components/onboarding/PaginationDots';
import { Button } from '@/components/ui/Button';
import { asyncStorage } from '@/services/storage/async-storage';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events';
import { STORAGE_KEYS } from '@/utils/constants';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { spacing } from '@/constants/spacing';

const { width } = Dimensions.get('window');
const SLIDES_COUNT = 3;

const slides = [
  {
    id: 'capture',
    illustration: <CaptureIllustration />,
    title: 'Capture Celebrity Signatures',
    description:
      'Meet your favorite celebrities and digitally capture their authentic signatures with precision and style.',
  },
  {
    id: 'wallpaper',
    illustration: <WallpaperIllustration />,
    title: 'Create Custom Wallpapers',
    description:
      'Transform signatures into stunning phone wallpapers with professional templates and customization options.',
  },
  {
    id: 'collection',
    illustration: <CollectionIllustration />,
    title: 'Build Your Collection',
    description:
      'Browse, organize, and showcase your growing collection of celebrity signatures in a beautiful gallery.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { track } = useAnalytics();
  const scrollViewRef = useRef<AnimatedScrollView | null>(null);
  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);

    if (index !== currentIndex) {
      setCurrentIndex(index);
      track(ANALYTICS_EVENTS.ONBOARDING_SLIDE_VIEWED, {
        slide_number: index + 1,
        slide_name: slides[index].id,
      });
    }
  };

  const handleComplete = async () => {
    try {
      await asyncStorage.set(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      track(ANALYTICS_EVENTS.ONBOARDING_COMPLETED, {
        slides_viewed: currentIndex + 1,
      });
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to save onboarding completion:', error);
    }
  };

  const handleSkip = async () => {
    try {
      await asyncStorage.set(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
      track(ANALYTICS_EVENTS.ONBOARDING_SKIPPED, {
        slides_viewed: currentIndex + 1,
      });
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to save onboarding skip:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < SLIDES_COUNT - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      handleComplete();
    }
  };

  const isLastSlide = currentIndex === SLIDES_COUNT - 1;

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <OnboardingSlide
            key={slide.id}
            illustration={slide.illustration}
            title={slide.title}
            description={slide.description}
          />
        ))}
      </Animated.ScrollView>

      {/* Pagination dots */}
      <View style={styles.footer}>
        <PaginationDots
          slides={SLIDES_COUNT}
          scrollX={scrollX}
          slideWidth={width}
        />

        {/* Next/Get Started button */}
        <View style={styles.buttonContainer}>
          <Button
            title={isLastSlide ? 'Get Started' : 'Next'}
            onPress={handleNext}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: spacing.lg,
    zIndex: 10,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  skipText: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
});
