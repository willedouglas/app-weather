import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, TextInput, View, FlatList } from 'react-native';

export default class Weather extends Component {
  renderLoading() {
    return (
      <View>
        <ActivityIndicator size="small" color="#1E90FF" />
      </View> 
    );
  }

  renderDescriptions(results) {
    const { onFilter, convert, week } = this.props;
    const { list, filtered, city } = results;

    const isNotEmptyList = list.length > 0;
    const isFiltered = filtered.length > 0;
    const listFilter = isFiltered ? filtered : list; 

    const weatherStyle = { 
      justifyContent: 'center', 
      alignItems: 'center' 
    };

    const weekDays = [{ value: 99, description: 'Todos' }];
    
    list.forEach(item => {
      weekDays.push(week(item.dt));
    });

    return (
      isNotEmptyList ? (
        <View style={{ display: isNotEmptyList ? 'flex' : 'none', flex: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>
            Exibindo o clima para a cidade de {city.name}.
          </Text>
          <View style={weatherStyle}>
            <View style={styles.weekDays}>
              {
                weekDays.map((weekDay, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => onFilter(weekDay.value)}>
                      <Text style={styles.weekDay}>
                        {weekDay.description}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              }
            </View>
          </View>
          <FlatList
            data={listFilter}
            renderItem={({ item }) => {
              return (
                <View style={styles.weatherItems}>
                  <TouchableOpacity onPress={() => onFilter(week(item.dt).value)}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {week(item.dt).description} ({convert(item.dt).toLocaleDateString()})
                    </Text>
                    <Text>
                      Temperatura: {item.main.temp}°C
                    </Text>
                    <Text>
                      Temperatura Mínima: {item.main.temp_min}°C
                    </Text>
                    <Text>
                      Temperatura Máxima: {item.main.temp_max}°C
                    </Text>
                    <Text>
                      Clima: {item.weather[0].description}
                    </Text>
                    {
                      isFiltered ? (
                      <View>
                        <Text>
                          Valocidade Vento: {item.wind.speed}
                        </Text>
                        <Text>
                          Pressão: {item.main.pressure}
                        </Text>
                        <Text>
                          Umidade: {item.main.humidity}
                        </Text>
                      </View>
                      ) : (
                      <Text style={{ fontWeight: 'bold' }}>
                        Clique no item para ter acesso a mais detalhes. 
                      </Text>
                      )
                    }
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <Text style={{ fontWeight: 'bold'}}>
          Nenhum resultado encontrado.
        </Text>
      )
    );
  }

  render() {
    const { onChange, loading, results, data } = this.props;
    const { searchText } = data;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Qual o nome da sua cidade?"
            onChangeText={(value) => onChange('searchText', value)}
            value={searchText}
          />
        </View>
        <View style={styles.infoContainer}>
          {loading ? this.renderLoading() : this.renderDescriptions(results)}
        </View>
      </View>
    );
  }
}

Weather.propTypes = {
  onChange: PropTypes.func.isRequired,
  week: PropTypes.func.isRequired,
  convert: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 30,
    paddingRight: 30
  },
  input: {
    color: '#333',
    fontSize: 16, 
    borderBottomColor: '#333',
    borderBottomWidth: 0.5
  },
  infoContainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  weatherItems: {
    padding: 15
  },
  weekDays: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10
  },
  weekDay: {
    fontWeight: 'bold', 
    margin: 5,
    flexWrap: 'wrap'
  }
});