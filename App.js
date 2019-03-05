import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';

/* Functions */
import { debounce, convertTimestampToDate, convertWeekday } from './src/utils/functions';

/* Settings */
import { apiUrl, apiKey } from './settings.json';

/* Pages */
import Weather from './src/pages/Weather.js';

/* Components */
import Header from './src/components/Header.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchText: '',
      },
      city: {},
      results: [],
      filtered: []
    };

    this.loading = false;
    this.searchDebounced = debounce(1000, this.search);
  }

  changeQuery = (key, value) => {
    this.loading = true;
    this.setState({ data: { ...this.state.data, [key]: value }}, () => {
      this.searchDebounced(this.state.data[key]);
    });
  };

  search = () => {
    this._fetch();
  };

  _fetch = () => {
    const { data } = this.state;

    axios.get(`${apiUrl}?appid=${apiKey}&mode=json&units=metric&lang=pt&q=${data.searchText},BR`)
    .then(res => {
      const { list, city } = res.data;

      const tempResults = [];
      
      list.forEach(item => {
        const date = convertTimestampToDate(item.dt);
        const hours = date.getHours();
        const filterResultsByHour = hours === 12;

        if (filterResultsByHour) {
          tempResults.push({ ...item, key: String(item.dt) });
        }
      });

      this.loading = false;
      this.setState({ results: tempResults, city });
    }).catch(() => { 
      this.loading = false;
      this.setState({ results: [], city: {} });
    });
  };
  
  filter(value) {
    const { results } = this.state;
    const filtered = results.filter(result => convertWeekday(result.dt).value === value);
    this.setState({ filtered });
  }

  render() {
    const { loading, state } = this;
    const { data, results, filtered, city } = state;

    const normalizeResults = Object.assign({}, { list: results, filtered, city });

    return (
      <View style={styles.container}>
        <Header title={'Weather Now'} />
        <Text style={styles.description}>
          Não sabe se deve levar um guarda-chuva antes de sair de casa?
          Digite o nome da sua cidade na caixa de texto e descubra a previsão do tempo nos próximos 5 dias.
        </Text>
        <Weather 
          data={data}
          loading={loading}
          results={normalizeResults}
          week={(time) => convertWeekday(time)}
          convert={(time) => convertTimestampToDate(time)}
          onFilter={(week) => this.filter(week)}
          onChange={(key, value) => this.changeQuery(key, value)} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  description: {
    padding: 15,
    textAlign: 'center'
  }
});