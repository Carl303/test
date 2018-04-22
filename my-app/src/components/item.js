import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false
    };
  }

  onClick() {
    let { toggled } = this.state;
    this.setState({
      toggled: !toggled
    });
  }

  render() {
    const { toggled } = this.state;
    const { index, item } = this.props;

    const colors = [
      '#894f23',
      '#dc241f',
      '#ffce04',
      '#007229',
      '#d799af',
      '#6a7278',
      '#751056',
      '#000000',
      '#162eac',
      '#03a0e2',
      '#76d0bd'
    ];

    let showAccord;

    index < 8
      ? (showAccord = toggled ? 'c-item  c-item__show' : 'c-item')
      : (showAccord = toggled ? 'c-item  c-item__show' : 'c-item');

    let statusColor;

    if (item.lineStatuses[0].statusSeverity > 9) {
      statusColor = '#008900';
    } else if (
      item.lineStatuses[0].statusSeverity < 10 &&
      item.lineStatuses[0].statusSeverity > 6
    ) {
      statusColor = '#a2480c';
    } else if (item.lineStatuses[0].statusSeverity < 7) {
      statusColor = '#dc3002';
    }

    return (
      <div className={showAccord}>
        <button className="c-item__top" onClick={() => this.onClick()}>
          <div
            className="c-item__side"
            style={{ backgroundColor: colors[index] }}
          />
          <h2>{item.name}</h2>
          <p style={{ color: statusColor }}>
            {item.lineStatuses[0].statusSeverityDescription}
          </p>
        </button>
        {!!item.lineStatuses[0].reason && (
          <div className="c-item__bottom">
            <p>{item.lineStatuses[0].reason}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
