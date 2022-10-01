import cx from 'classnames';

import { IBlockLoadingProps } from './props';
import LoadingMask from './components/LoadingMask';
import useDelayed from './hooks/useDelayed';

export function BlockLoading(props: IBlockLoadingProps) {
  // const height = getHeight(props);
  const { loading = false, delay = 0, className, children, icon = 'youzan', iconSize, iconText, textPosition = 'bottom', colorPreset = 'primary' } = props;
  const hasChildren = !!children;
  const delayed = useDelayed({ loading, delay });
  const showMask = !delayed && loading;

  if (!showMask && !hasChildren) {
    return null;
  }

  return (
    <div
      className={cx('zent-loading', 'zent-loading--block', className, {
        'zent-loading--has-children': hasChildren,
      })}
    >
      {children}
      {showMask && <LoadingMask icon={icon} size={iconSize} text={iconText} textPosition={textPosition} colorPreset={colorPreset} />}
    </div>
  );
}

export default BlockLoading;
