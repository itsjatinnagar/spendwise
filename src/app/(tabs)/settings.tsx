import Button from "@/components/common/button";
import Text from "@/components/common/text";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Trash } from "@/components/icons/trash";
import { Edit } from "@/components/icons/edit";
import { Info } from "@/components/icons/info";
import { CloudUpload } from "@/components/icons/cloud-upload";
import { ChevronRight } from "@/components/icons/chevron-right";

export default function Screen() {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "top"]}>
      <Text.Title>Settings</Text.Title>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 24, fontWeight: 600 }}>JD</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>John Doe</Text>
          <Text>john.doe@email.com</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={{ gap: 8, alignItems: "center", flexDirection: "row" }}>
          <View style={styles.iconWrap}>
            <Edit color="#FFBA00" />
          </View>
          <Text.Label style={{ flex: 1 }}>Edit Profile</Text.Label>
          <ChevronRight color="#62748E" />
        </View>
        <Link href="/imports">
          <View style={{ gap: 8, alignItems: "center", flexDirection: "row" }}>
            <View style={styles.iconWrap}>
              <CloudUpload color="#FFBA00" />
            </View>
            <Text.Label style={{ flex: 1 }}>Import History</Text.Label>
            <ChevronRight color="#62748E" />
          </View>
        </Link>
        <View style={{ gap: 8, alignItems: "center", flexDirection: "row" }}>
          <View style={styles.iconWrap}>
            <Info color="#FFBA00" />
          </View>
          <Text.Label style={{ flex: 1 }}>Version</Text.Label>
          <Text.Caption>{Constants.expoConfig?.version}</Text.Caption>
        </View>
      </View>

      <Button color="#E7000B">
        <Trash color="#FFFFFF" />
        <Button.Label style={{ color: "#FFFFFF" }}>Delete Account</Button.Label>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  row: {
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFBA00",
  },
  card: {
    gap: 20,
    flex: 1,
    padding: 12,
    borderRadius: 20,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF7E5",
  },
});
