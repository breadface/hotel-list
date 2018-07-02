import React, {Component, Fragment} from 'react';
import {Loader} from './Utils';

class WindowEvent extends Component {
  componentDidMount() {
    const {passive, name, handler} = this.props
    const fn = e => {
      if (passive) {
        e.preventDefault();
      }
      handler(e);
    }
    window.addEventListener(name, fn);
    this.unbind = () => {
      window.removeEventListener(name, fn);
    }
  }

  componentWillUnmount() {
    this.unbind();
  }

  render(){
    return null;
  }
}

const ScrollView = ({
  loadData,
  children,
  loading
}) => {
  const handleOnScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      if (typeof loadData === 'function') {
        loadData();
      }
    }
  }
  return (
    <Fragment>
      <WindowEvent
        name="scroll"
        passive={true}
        handler={handleOnScroll}
      />
      {children}
      <Loader
        loading={loading}
        children={null}
      />
    </Fragment>
  );
}

export default ScrollView;
