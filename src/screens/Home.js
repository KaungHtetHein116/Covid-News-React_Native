import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import {sizes} from '../helpers/Constants';
import {deobfuscate} from '../helpers/HelperFunctions';
import Card from '../components/Card';
import Loading from '../components/Loading';

const secretKey = 1491574401791631;
const cjs = require('crypto-js');
const covidURL =
  'https://onepayuat.agdbank.com/API/Wallet/Wallet_GetNewsAlertDashboardWithSection';
const covidDetailURL =
  'https://onepayuat.agdbank.com/API/Wallet/Wallet_GetNewsContentBySection';

const Home = () => {
  const [sections, setSections] = useState([]);
  const [navHeaderTitle, setNavHeaderTitle] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');
  const [cases, setCases] = useState([]);
  const [footerLabel, setFooterLable] = useState('');
  const [selectedSection, setSelectedSection] = useState({});
  const [news, setNews] = useState([]);
  const [eductions, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentNewsPage, setCurrentNewsPage] = useState(0);
  const [currentEduPage, setCurrentEduPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (sections.length != 0) {
      fetchNews();
      fetchEducation();
    }
  }, [sections]);

  useEffect(() => {
    if (currentNewsPage > 2) return;
    fetchNews();
  }, [currentNewsPage]);

  useEffect(() => {
    if (currentEduPage > 2) return;
    fetchEducation();
  }, [currentEduPage]);

  const fetchData = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        UserID: 'GHTShvJNJmw=',
        SessionID: 'Fzj/Qc/MGoc=',
        NewsAlertID: 'YvG07IPjjpM=',
      }),
    };

    fetch(covidURL, options)
      .then(res => res.json())
      .then(res => {
        const decryptedData = deobfuscate(
          res.NewsAlertEncModel,
          secretKey,
          cjs,
        );
        const data = JSON.parse(decryptedData);
        const title = `${data.Dashboard[0].Header} (As of ${data.Dashboard[0].LastUpdate})`;

        setNavHeaderTitle(data.Title);
        setCases(data.Dashboard[0].Data);
        setFooterLable(data.Dashboard[0].Footer);
        setHeaderTitle(title);
        setSections(data.News);
        setSelectedSection(data.News[0]);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
      });
  };

  const onBackPress = () => {};

  const onPressSection = section => {
    setSelectedSection(section);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>
    );
  };

  const renderCases = () => {
    return (
      <View style={styles.caseContainer}>
        <View style={styles.allCasesWrapper}>
          {cases.map((item, index) => (
            <View style={styles.caseWrapper} key={index}>
              <Text style={styles.caseTitle}>{item.Title}</Text>
              <Text style={styles.caseNumber}>{item.Value}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.disclaimerLabel}>{footerLabel}</Text>
      </View>
    );
  };

  const renderSections = () => {
    return (
      <View style={styles.sectionContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onPressSection(section)}
            style={[
              styles.sectionWrapper,
              {
                backgroundColor:
                  selectedSection.NewsSectionID == section.NewsSectionID
                    ? '#042439'
                    : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.sectionLabel,
                {
                  color:
                    selectedSection.NewsSectionID == section.NewsSectionID
                      ? 'white'
                      : '#a2a2a2',
                },
              ]}>
              {section.Name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const fetchNews = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        SessionID: 'Fzj/Qc/MGoc=',
        UserID: 'GHTShvJNJmw=',
        NewsAlertID: 'YvG07IPjjpM=',
        SectionID: 'YvG07IPjjpM=',
        Limit: 'q8z6gJiOhEk=',
        Page:
          currentNewsPage == 0
            ? 'xEOk88+xrpE='
            : currentNewsPage == 1
            ? 'YvG07IPjjpM='
            : 'yBwuKLl841Y=',
      }),
    };

    fetch(covidDetailURL, options)
      .then(res => res.json())
      .then(res => {
        const decryptedData = deobfuscate(
          res.NewsAlertEncModel,
          secretKey,
          cjs,
        );

        const data = JSON.parse(decryptedData);

        setNews(news.concat(data));
      })
      .catch(err => console.log('err', err));
  };

  const fetchEducation = () => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        SessionID: 'Fzj/Qc/MGoc=',
        UserID: 'GHTShvJNJmw=',
        NewsAlertID: 'YvG07IPjjpM=',
        SectionID: 'yBwuKLl841Y=',
        Limit: 'q8z6gJiOhEk=',
        Page:
          currentEduPage == 0
            ? 'xEOk88+xrpE='
            : currentEduPage == 1
            ? 'YvG07IPjjpM='
            : 'yBwuKLl841Y=',
      }),
    };

    fetch(covidDetailURL, options)
      .then(res => res.json())
      .then(res => {
        const decryptedData = deobfuscate(
          res.NewsAlertEncModel,
          secretKey,
          cjs,
        );

        const data = JSON.parse(decryptedData);

        setEducations(eductions.concat(data));
      })
      .catch(err => console.log('err', err));
  };

  const renderItemSeparator = () => (
    <View
      style={{
        height: 0.5,
        backgroundColor: '#a2a2a2',
        width: '80%',
        alignSelf: 'center',
      }}
    />
  );

  const handleNewsLoadMore = () => {
    setCurrentNewsPage(prev => prev + 1);
  };

  const handleEduLoadMore = () => {
    setCurrentEduPage(prev => prev + 1);
  };

  const renderNews = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={news}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={({item}) => {
          return <Card item={item} />;
        }}
        ListEmptyComponent={() => <Loading />}
        onEndReachedThreshold={0.5}
        onEndReached={handleNewsLoadMore}
      />
    );
  };

  const renderEducation = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={eductions}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderItemSeparator}
        renderItem={({item}) => {
          return <Card item={item} />;
        }}
        ListEmptyComponent={() => <Loading />}
        onEndReachedThreshold={0.5}
        onEndReached={handleEduLoadMore}
      />
    );
  };

  if (loading) return <Loading />;

  console.log('number of news', news.length);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={navHeaderTitle} onBackPress={onBackPress} />
      {renderHeader()}
      {renderCases()}
      {renderSections()}
      {selectedSection?.NewsSectionID == 2 ? renderNews() : renderEducation()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 40,
    backgroundColor: '#042439',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    marginLeft: 20,
  },
  caseContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  caseTitle: {
    fontSize: sizes.small,
    color: '#a2a2a2',
    marginBottom: 15,
  },
  caseWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  disclaimerLabel: {
    marginHorizontal: 20,
    color: '#a2a2a2',
    fontSize: sizes.small,
    marginBottom: 15,
  },
  allCasesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sectionWrapper: {
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 20,
  },
  sectionLabel: {
    color: 'white',
    paddingHorizontal: 15,
  },
});

export default Home;
