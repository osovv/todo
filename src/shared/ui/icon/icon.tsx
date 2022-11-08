import * as HIcons from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useMemo } from 'react';

interface DragIndicatorIconProps {
  className?: string;
}

const DragIndicatorIcon = ({ className }: DragIndicatorIconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    className={className}
  >
    <path d='M0 0h24v24H0V0z' fill='none' />
    <path d='M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
  </svg>
);

const { ...icons } = HIcons;

export const allIconNames = Object.keys(icons);

type IconName = keyof typeof icons | 'DragIndicatorIcon';

type IconSize = '3' | '4' | '5' | '6';

const ICON_SIZE_CLASS_NAME: { [K in IconSize]: string } = {
  '3': 'h-3 w-3',
  '4': 'h-4 w-4',
  '5': 'h-5 w-5',
  '6': 'h-6 w-6',
};

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

export const Icon = ({ name, size = '4', className }: IconProps) => {
  let IconComponent;
  if (name === 'DragIndicatorIcon') {
    IconComponent = DragIndicatorIcon;
  } else {
    IconComponent = icons[name];
  }

  const classname = useMemo(
    () => cn('text-gray-600', className, ICON_SIZE_CLASS_NAME[size]),
    [className, size],
  );

  return <IconComponent className={classname} />;
};
