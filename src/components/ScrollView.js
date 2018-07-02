//@flow
import * as React from "react";
import { Loader } from "./Utils";

/*
Simple component that will not render anything.
On mount it will bind to a document event, and it will clean up on unmount
  <DocumentEvent
    name="scroll"
    handler={updateScrollPosition}
  />
*/

type T_windowevent_props = {
  handler: (e: any) => void,
  name: string,
  passive?: boolean
};

type T_scrollview_props = {
  loadData?: () => Promise<any>,
  children: React$Element<any>,
  loading: boolean
};

class WindowEvent extends React.Component<T_windowevent_props> {
  unbind: () => void;
  componentDidMount() {
    const { passive, name, handler } = this.props;
    const fn = e => {
      if (passive) {
        e.preventDefault();
      }
      handler(e);
    };
    window.addEventListener(name, fn);
    this.unbind = () => {
      window.removeEventListener(name, fn);
    };
  }

  componentWillUnmount() {
    this.unbind();
  }

  render() {
    return null;
  }
}

const ScrollView = ({ loadData, children, loading }: T_scrollview_props) => {
  const handleOnScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      (document: Object).body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      (document: Object).body.scrollHeight;
    const clientHeight =
      (document: Object).documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      if (typeof loadData === "function") {
        loadData();
      }
    }
  };
  return (
    <React.Fragment>
      <WindowEvent name="scroll" passive={true} handler={handleOnScroll} />
      {children}
      <Loader loading={loading} children={null} />
    </React.Fragment>
  );
};

export default ScrollView;
