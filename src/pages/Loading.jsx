import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loading-overlay" aria-busy="true">
        <div id="Loading" className="loading" role="status" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          Carregando...
        </div>
      </div>
    );
  }
}

export default Loading;
