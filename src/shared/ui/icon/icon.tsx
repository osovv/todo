import * as HIcons from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useMemo } from 'react';

const { ...icons } = HIcons;

export const allIconNames = Object.keys(icons);

type IconName = keyof typeof icons;

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
  const IconComponent = icons[name];

  const classname = useMemo(
    () => cn('text-gray-600', className, ICON_SIZE_CLASS_NAME[size]),
    [className, size],
  );

  return <IconComponent className={classname} />;
};
