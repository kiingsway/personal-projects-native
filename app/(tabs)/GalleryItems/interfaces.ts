export type TView = 'grid' | 'list';
export type TFilter = 'nonFullHd' | 'above2k';

export interface IGalleryConfig {
  view: TView;
  filters: Record<TFilter, boolean>;
}

export interface IAppFilters {
  nonFullHd: boolean;
  above2k: boolean;
}