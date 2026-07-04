import { useState } from "react";
import {
  Alert,
  DevSettings,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteDatabaseSync } from "expo-sqlite";
import { Storage } from "expo-sqlite/kv-store";
import { expoDB } from "@/database";
import Text from "./text";
import Button from "./button";

export type ErrorBoundaryProps = {
  error: Error;
  retry: () => Promise<void>;
};

export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleWipeDatabase = () => {
    // 1st Alert confirmation: Highlighting offline data loss risk
    Alert.alert(
      "⚠️ WIPE DATABASE & PERMANENT DATA LOSS",
      "Spendwise is a 100% offline-only application. All your transaction history, account details, categories, and custom settings are stored locally on this device.\n\nResetting the database will permanently delete all of your data. There is NO backup, NO cloud sync, and NO way to recover it.\n\nAre you absolutely sure you want to proceed?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Wipe Database",
          style: "destructive",
          onPress: () => {
            // 2nd Alert confirmation: Strict double verification
            Alert.alert(
              "🚨 FINAL CONFIRMATION",
              "This action is completely irreversible. Type 'WIPE' is not required, but confirming below will instantly erase everything. Are you 100% sure?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes, Delete Permanently",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      // Close database connection
                      expoDB.closeSync();
                      
                      // Delete SQLite file
                      deleteDatabaseSync("spendwise.db");
                      
                      // Clear Key-Value settings (e.g. onboard status, version flags)
                      await Storage.clear();

                      Alert.alert(
                        "Success",
                        "Database has been completely wiped. The application will reload now.",
                        [
                          {
                            text: "Reload App",
                            onPress: () => {
                              DevSettings.reload();
                            },
                          },
                        ]
                      );
                    } catch (err: any) {
                      Alert.alert(
                        "Error Resetting Database",
                        `Failed to clear local files: ${err.message || String(err)}`
                      );
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⚠️</Text>
          </View>
          
          <Text.Title style={styles.title}>Oops, Something Went Wrong</Text.Title>
          <Text style={styles.subtitle}>
            An unexpected error occurred and the app couldn't recover automatically.
          </Text>

          <View style={styles.errorBox}>
            <Text.Label style={styles.errorMessage}>
              {error?.name || "Error"}: {error?.message || "Unknown error occurred"}
            </Text.Label>
          </View>

          <TouchableOpacity
            style={styles.detailsToggle}
            onPress={() => setShowDetails(!showDetails)}
            activeOpacity={0.7}
          >
            <Text.Label style={styles.detailsToggleText}>
              {showDetails ? "Hide Technical Details ▲" : "Show Technical Details ▼"}
            </Text.Label>
          </TouchableOpacity>

          {showDetails && (
            <View style={styles.detailsBox}>
              <ScrollView nestedScrollEnabled style={styles.detailsScroll}>
                <Text.Caption style={styles.stackText}>
                  {error?.stack || "No stack trace available."}
                </Text.Caption>
              </ScrollView>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={() => retry()} color="#FFBA00">
            <Button.Label style={styles.buttonLabel}>Try Again</Button.Label>
          </Button>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text.Caption style={styles.dividerText}>Troubleshooting</Text.Caption>
            <View style={styles.dividerLine} />
          </View>

          <Button onPress={handleWipeDatabase} color="#FF3B30">
            <Button.Label style={[styles.buttonLabel, { color: "#FFFFFF" }]}>
              Wipe Database & Reset App
            </Button.Label>
          </Button>
          
          <Text.Caption style={styles.warningText}>
            Wiping the database will permanently delete all your offline data. Use this only if the app is stuck in a crash loop due to database corruption.
          </Text.Caption>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#FFE0E0",
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFE5E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
    color: "#D92D20",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#667085",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  errorBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FDA29B",
    marginBottom: 16,
  },
  errorMessage: {
    color: "#B42318",
    fontSize: 14,
    lineHeight: 20,
  },
  detailsToggle: {
    paddingVertical: 8,
  },
  detailsToggleText: {
    color: "#475467",
    fontSize: 14,
  },
  detailsBox: {
    width: "100%",
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    height: 180,
  },
  detailsScroll: {
    flex: 1,
  },
  stackText: {
    color: "#FF453A",
    fontFamily: "Courier",
    fontSize: 12,
    lineHeight: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  buttonLabel: {
    fontSize: 16,
    color: "#000000",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#EAECF0",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#98A2B3",
    fontWeight: "500",
  },
  warningText: {
    color: "#667085",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 4,
  },
});
