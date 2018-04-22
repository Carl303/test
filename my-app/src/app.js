import React, { Component } from 'react';
import Item from './components/item';
import Spinner from './assets/img/spinner2.gif';
//import DummyData from './assets/json/data.json';
import './assets/css/app.css';
import config from './config.json';
import content from './content.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    fetch(
      `https://cors-anywhere.herokuapp.com/http://api.tfl.gov.uk/Line/Mode/Tube/Status?app_id=${
        config.id
      }&app_key=${config.key}`
    )
      .then(result => result.json())
      .then(data => this.setState({ data, loading: false, error: '' }))
      .catch(error => {
        console.log('request failed', error);
        this.setState({ data: [], loading: false, error: error });
      });
  }

  render() {
    /* load live data */
    let { data, loading, error } = this.state;

    /* load dummy data */
    // let { error } = this.state;
    // let loading = false;
    // let data = DummyData;

    const itemsGroup1 = data.map((item, i) => {
      return !!(i < 6) && <Item key={i} index={i} item={item} />;
    });

    const itemsGroup2 = data.map((item, i) => {
      return !!(i > 5) && <Item key={i} index={i} item={item} />;
    });

    const errorMsg = (
      <h3>
        {content.errorText1}
        <br />
        {content.errorText2}
        <a href="/">{content.errorText3}</a>
      </h3>
    );

    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">{content.title}</h1>
        </header>
        <main className="app-body clearfix">
          {!!error && errorMsg}
          <div className="left">
            {loading ? (
              <img
                src={Spinner}
                alt="loadig"
                width="60"
                height="60"
                className="c-spinner"
              />
            ) : (
              itemsGroup1
            )}
          </div>
          <div className="right">{itemsGroup2}</div>
        </main>
      </div>
    );
  }
}

export default App;
