type TScoreBadgeProps = { score: number };

type TKeywordBadgeProps = {
  keywords: string[];
};

type TGetScoreVariant = {
  styles: Record<string, string>;
} & TScoreBadgeProps;

export type { TScoreBadgeProps, TGetScoreVariant, TKeywordBadgeProps };
