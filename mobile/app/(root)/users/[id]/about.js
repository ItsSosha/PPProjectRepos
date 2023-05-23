import * as Linking from "expo-linking";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../../src/auth/auth";

const styles = StyleSheet.create({
  utils: {
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    linkButton: {
      background: "none",
      textDecoration: "underline"
    }
  },
  layout: {
    container: {
      flex: 1,
      paddingHorizontal: 20
    },
    profileImageContainer: {
      alignItems: "center"
    },
    subscriptionSection: {
      heading: {
        marginTop: 30,
      },
      body: {
        marginTop: 10,
        rowGap: 5
      }
    }
  },
  typography: {
    userInfo: {
      main: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 600
      },
      sub: {
        fontSize: 15,
      }
    },
    subscriptionSection: {
      heading: {
        fontWeight: 700,
        fontSize: 30
      },
      body: {
        fontSize: 20,
        lineHeight: 28
      },
      link: {
        fontSize: 20,
        lineHeight: 28,
        textDecorationLine: "underline"
      }
    }
  }
})

const user = {
  name: "Shark Fishers",
  email: "shark@ocean.bul",
  isPremium: true,
  profileImageUrl: "https://lh3.googleusercontent.com/ogw/AOLn63HMIWZpv0of2VYV5NFGSQlWW5BU6GmdSx2OZOnBJA=s256-c-mo"
}

const Home = (props) => {
  const { user } = useAuth();

  return (
    <View style={styles.layout.container}>
      {(user) ?
        <>
          <View style={styles.layout.profileImageContainer}>
            <Image
              source={{
                uri: user.pictureLink.slice(0, user.pictureLink.indexOf("s96-c")) + "s256-c"
              }}
              style={{
                height: 200,
                width: 200,
                borderRadius: 100,
                marginTop: 30,
              }} />
          </View>
          <View style={styles.utils.center}>
            <Text style={styles.typography.userInfo.main}>
              {`${user.firstName} ${user.surname}`}
            </Text>
            <Text style={styles.typography.userInfo.sub}>
              {user.email}
            </Text>
          </View>
          <View style={styles.layout.subscriptionSection.heading}>
            <Text style={styles.typography.subscriptionSection.heading}>
              Преміум-підписка
            </Text>
            {(user.isPremium) ?
              <View style={styles.layout.subscriptionSection.body}>
                <Text style={styles.typography.subscriptionSection.body}>
                  Ваша підписка діє з 28.04.2023 до 28.05.2023
                </Text>
                <Text style={styles.typography.subscriptionSection.body}>
                  До сплину підписки 30 днів
                </Text>
                <Text
                  style={styles.typography.subscriptionSection.link}
                  onPress={() => Linking.openURL("https://pricely.tech")}
                >
                  Продовжити підписку можна у веб-версії застосунку
                </Text>
              </View> :
              <View>
                <Text style={styles.typography.subscriptionSection.body}>
                  На даний момент преміум-підписка не активна
                </Text>
                <Text
                  style={styles.typography.subscriptionSection.link}
                  onPress={() => Linking.openURL("https://pricely.tech")}
                >
                  Оформити підписку можна у веб-версії застосунку
                </Text>
              </View>
            }
          </View>
        </> :
        <Text>
          Loading...
        </Text>}
    </View>
  )
};

export default Home;