import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';
import { logWeight, getWeightHistory } from '../utils/api';
import { LineChart } from 'react-native-gifted-charts';

const { width: screenWidth } = Dimensions.get('window');

interface WeightEntry {
  date: string;
  weight: number;
  note?: string;
}

interface WeightStats {
  start_weight: number;
  current_weight: number;
  change: number;
  change_percent: number;
  target_weight: number | null;
  remaining: number | null;
  entries_count: number;
  period_days: number;
}

interface WeightChartProps {
  currentWeight?: number;
  targetWeight?: number;
  onWeightUpdate?: (weight: number) => void;
}

export default function WeightChart({ currentWeight, targetWeight, onWeightUpdate }: WeightChartProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<WeightEntry[]>([]);
  const [stats, setStats] = useState<WeightStats | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWeight, setNewWeight] = useState(currentWeight?.toString() || '');
  const [saving, setSaving] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  useEffect(() => {
    loadWeightHistory();
  }, [selectedPeriod]);

  const loadWeightHistory = async () => {
    try {
      setLoading(true);
      const response = await getWeightHistory(selectedPeriod) as any;
      if (response) {
        setHistory(response.history || []);
        setStats(response.stats || null);
      }
    } catch (error) {
      console.error('Error loading weight history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWeight = async () => {
    const weight = parseFloat(newWeight);
    if (isNaN(weight) || weight < 20 || weight > 500) {
      Alert.alert(t('error') || 'Hata', t('enterValidWeight') || 'Geçerli bir kilo girin (20-500 kg)');
      return;
    }

    try {
      setSaving(true);
      await logWeight(weight);
      setShowAddModal(false);
      setNewWeight('');
      loadWeightHistory();
      onWeightUpdate?.(weight);
      Alert.alert(t('success') || 'Başarılı', t('weightLogged') || 'Kilo kaydedildi');
    } catch (error: any) {
      Alert.alert(t('error') || 'Hata', error.message || t('weightLogError') || 'Kilo kaydedilemedi');
    } finally {
      setSaving(false);
    }
  };

  // Prepare chart data
  const chartData = history.map((entry, index) => ({
    value: entry.weight,
    label: index === 0 || index === history.length - 1 
      ? entry.date.slice(5) // MM-DD format
      : '',
    dataPointText: index === history.length - 1 ? `${entry.weight}` : '',
  }));

  // Calculate min/max for chart
  const weights = history.map(h => h.weight);
  const minWeight = weights.length > 0 ? Math.floor(Math.min(...weights) - 2) : 50;
  const maxWeight = weights.length > 0 ? Math.ceil(Math.max(...weights) + 2) : 100;

  const renderStats = () => {
    if (!stats) return null;

    const changeColor = stats.change < 0 ? '#27ae60' : stats.change > 0 ? '#e74c3c' : Colors.lightText;
    const changeIcon = stats.change < 0 ? 'trending-down' : stats.change > 0 ? 'trending-up' : 'remove';

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{t('startWeight') || 'Başlangıç'}</Text>
          <Text style={styles.statValue}>{stats.start_weight} kg</Text>
        </View>
        <View style={[styles.statItem, styles.statItemCenter]}>
          <Text style={styles.statLabel}>{t('change') || 'Değişim'}</Text>
          <View style={styles.changeRow}>
            <Ionicons name={changeIcon as any} size={18} color={changeColor} />
            <Text style={[styles.statValue, { color: changeColor }]}>
              {stats.change > 0 ? '+' : ''}{stats.change} kg
            </Text>
          </View>
          <Text style={[styles.statPercent, { color: changeColor }]}>
            ({stats.change_percent > 0 ? '+' : ''}{stats.change_percent}%)
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{t('current') || 'Şu an'}</Text>
          <Text style={styles.statValue}>{stats.current_weight} kg</Text>
        </View>
      </View>
    );
  };

  const renderTargetProgress = () => {
    if (!stats?.target_weight || !stats?.current_weight) return null;

    const total = Math.abs(stats.start_weight - stats.target_weight);
    const achieved = Math.abs(stats.start_weight - stats.current_weight);
    const progress = total > 0 ? Math.min((achieved / total) * 100, 100) : 0;
    const isLosing = stats.target_weight < stats.start_weight;

    return (
      <View style={styles.targetContainer}>
        <View style={styles.targetHeader}>
          <Text style={styles.targetLabel}>{t('goalProgress') || 'Hedef İlerlemesi'}</Text>
          <Text style={styles.targetText}>
            {stats.current_weight} → {stats.target_weight} kg
          </Text>
        </View>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={isLosing ? ['#27ae60', '#2ecc71'] : ['#3498db', '#2980b9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${progress}%` }]}
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>{Math.round(progress)}% {t('completed') || 'tamamlandı'}</Text>
          {stats.remaining && (
            <Text style={styles.remainingText}>
              {Math.abs(stats.remaining)} kg {isLosing ? t('toGo') || 'kaldı' : t('toGain') || 'alınacak'}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="trending-up" size={22} color={Colors.primary} />
          <Text style={styles.title}>{t('weightTracking') || 'Kilo Takibi'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => {
            setNewWeight(currentWeight?.toString() || '');
            setShowAddModal(true);
          }}
        >
          <Ionicons name="add-circle" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {[7, 30, 90].map(period => (
          <TouchableOpacity
            key={period}
            style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}>
              {period} {t('days') || 'gün'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="scale-outline" size={48} color={Colors.lightText} />
          <Text style={styles.emptyText}>{t('noWeightData') || 'Henüz kilo kaydı yok'}</Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={() => {
              setNewWeight(currentWeight?.toString() || '');
              setShowAddModal(true);
            }}
          >
            <Text style={styles.emptyButtonText}>{t('logFirstWeight') || 'İlk kilonuzu kaydedin'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Stats */}
          {renderStats()}

          {/* Chart */}
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={screenWidth - 64}
              height={160}
              spacing={Math.max(20, (screenWidth - 100) / chartData.length)}
              initialSpacing={10}
              color={Colors.primary}
              thickness={2}
              startFillColor={Colors.primary + '40'}
              endFillColor={Colors.primary + '05'}
              startOpacity={0.4}
              endOpacity={0.05}
              areaChart
              hideDataPoints={chartData.length > 15}
              dataPointsColor={Colors.primary}
              dataPointsRadius={4}
              yAxisColor={Colors.lightText}
              xAxisColor={Colors.lightText}
              yAxisTextStyle={{ color: Colors.lightText, fontSize: 10 }}
              xAxisLabelTextStyle={{ color: Colors.lightText, fontSize: 9 }}
              hideRules
              curved
              noOfSections={4}
              maxValue={maxWeight}
              yAxisOffset={minWeight}
              showVerticalLines={false}
              pointerConfig={{
                pointerStripHeight: 140,
                pointerStripColor: Colors.primary + '40',
                pointerStripWidth: 2,
                pointerColor: Colors.primary,
                radius: 6,
                pointerLabelWidth: 80,
                pointerLabelHeight: 30,
                activatePointersOnLongPress: true,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: (items: any) => {
                  return (
                    <View style={styles.pointerLabel}>
                      <Text style={styles.pointerText}>{items[0].value} kg</Text>
                    </View>
                  );
                },
              }}
            />
          </View>

          {/* Target Progress */}
          {renderTargetProgress()}
        </>
      )}

      {/* Add Weight Modal */}
      <Modal visible={showAddModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('logWeight') || 'Kilo Kaydet'}</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close-circle" size={28} color={Colors.lightText} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.weightInputWrapper}>
                <TouchableOpacity 
                  style={styles.adjustButton}
                  onPress={() => {
                    const current = parseFloat(newWeight) || currentWeight || 70;
                    setNewWeight((current - 0.1).toFixed(1));
                  }}
                >
                  <Ionicons name="remove" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <TextInput
                  style={styles.weightInput}
                  value={newWeight}
                  onChangeText={setNewWeight}
                  keyboardType="decimal-pad"
                  placeholder="70.0"
                  placeholderTextColor={Colors.lightText}
                />
                <Text style={styles.unitText}>kg</Text>
                <TouchableOpacity 
                  style={styles.adjustButton}
                  onPress={() => {
                    const current = parseFloat(newWeight) || currentWeight || 70;
                    setNewWeight((current + 0.1).toFixed(1));
                  }}
                >
                  <Ionicons name="add" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>

              {/* Quick adjust buttons */}
              <View style={styles.quickAdjust}>
                {[-1, -0.5, +0.5, +1].map(delta => (
                  <TouchableOpacity
                    key={delta}
                    style={styles.quickButton}
                    onPress={() => {
                      const current = parseFloat(newWeight) || currentWeight || 70;
                      setNewWeight((current + delta).toFixed(1));
                    }}
                  >
                    <Text style={styles.quickButtonText}>
                      {delta > 0 ? '+' : ''}{delta} kg
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddWeight}
              disabled={saving}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveButtonGradient}
              >
                {saving ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={22} color="#FFF" />
                    <Text style={styles.saveButtonText}>{t('save') || 'Kaydet'}</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  addButton: {
    padding: 4,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  periodButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  periodText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.darkText,
  },
  periodTextActive: {
    color: Colors.white,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.lightText,
    marginTop: 12,
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emptyButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statItemCenter: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E8E8E8',
    paddingHorizontal: 16,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.lightText,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statPercent: {
    fontSize: 11,
    marginTop: 2,
  },
  chartContainer: {
    marginVertical: 8,
    marginLeft: -8,
  },
  pointerLabel: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  pointerText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  targetContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 12,
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  targetLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.darkText,
  },
  targetText: {
    fontSize: 13,
    color: Colors.lightText,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  remainingText: {
    fontSize: 12,
    color: Colors.lightText,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkText,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  weightInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adjustButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weightInput: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.darkText,
    textAlign: 'center',
    minWidth: 120,
    padding: 8,
  },
  unitText: {
    fontSize: 20,
    color: Colors.lightText,
    fontWeight: '500',
  },
  quickAdjust: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  quickButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  quickButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.darkText,
  },
  saveButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
