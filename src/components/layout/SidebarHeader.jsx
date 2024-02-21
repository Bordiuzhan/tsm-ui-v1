import React from 'react';

const SidebarHeader = () => {
  return (
    <div className="sidebar-logo">
      <div className="peers ai-c fxw-nw">
        <div className="peer peer-greed">
          <a className="sidebar-link td-n" href="index.html">
            <div className="peers ai-c fxw-nw">
              <div className="peer">
                <div className="logo pt-1">
                  <img src="assets/static/images/DNM Logo.svg" alt="logo" />
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="peer">
          <div className="mobile-toggle sidebar-toggle">
            <a href="#" className="td-n">
              <i className="ti-arrow-circle-left"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarHeader;
