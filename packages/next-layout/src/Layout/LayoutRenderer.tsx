import { Component } from "react";
import type { ReactNode, RefObject } from "react";

type LayoutRendererProps = {
  layoutChildrenRef: RefObject<ReactNode | null>;
};

// NOTE: needed to perform sync update with 'forceUpdate'
class LayoutRenderer extends Component<LayoutRendererProps> {
  public render() {
    const { layoutChildrenRef } = this.props;
    return layoutChildrenRef.current;
  }
}

export default LayoutRenderer
