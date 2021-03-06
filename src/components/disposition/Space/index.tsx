import { Obj } from "@noreajs/common";
import React, { ReactNode, Fragment, useContext } from "react";
import { designContext } from "../../providers/DesignProvider";
import Flex from "../Flex/index";
import { FlexProps } from "../Flex/index";

export type SpaceProps = FlexProps & {
  /**
   * Split items with a divider
   *
   * @default undefined
   */
  split?: ReactNode;
};

/**
 * Flex component with default `gap` and additional properties (`split`)
 */
const Space = React.forwardRef<HTMLDivElement, SpaceProps>((props, ref) => {
  // load global props
  const { spaceProps } = useContext(designContext);
  // explode props
  const { split, children, ...restProps } = Obj.mergeStrict(
    props,
    spaceProps ?? {},
    "left"
  );

  /**
   * Clear the children list from empty elements
   * @param list list of elements
   * @returns Array<any>
   */
  const safeList = (list: any) => {
    if (Array.isArray(list)) {
      const ar = list as any[];
      return ar.filter((item) => !!item);
    } else {
      return [list];
    }
  };

  /**
   * Add split before child if needed
   * @param child element
   * @param index child index
   * @param childrenLengh children length
   * @returns React.Element
   */
  const addChild = (child: any, index: number, childrenLengh: number) => {
    if (index !== 0 && index <= childrenLengh - 1) {
      return (
        <Fragment>
          {split}
          {child}
        </Fragment>
      );
    } else {
      return child;
    }
  };

  return (
    <Flex ref={ref} {...restProps}>
      {split !== null && split !== undefined
        ? React.Children.map(safeList(children), (child, index) =>
            addChild(child, index, safeList(children).length)
          )
        : children}
    </Flex>
  );
});

Space.defaultProps = {};

export default Space;
