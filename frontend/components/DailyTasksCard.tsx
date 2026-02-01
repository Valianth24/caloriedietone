import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { useTranslation } from 'react-i18next';

interface DailyTask {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  titleTr: string;
  titleEn: string;
  xp: number;
  completed: boolean;
  progress?: number;
  total?: number;
}

interface DailyTasksCardProps {
  tasks: DailyTask[];
  onTaskPress?: (taskId: string) => void;
}

export default function DailyTasksCard({ tasks, onTaskPress }: DailyTasksCardProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'tr' ? 'tr' : 'en';
  
  const completedCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedCount / totalTasks) * 100;
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
          <Text style={styles.headerTitle}>
            {lang === 'tr' ? 'Günlük Görevler' : 'Daily Tasks'}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.completionText}>
            {completedCount}/{totalTasks}
          </Text>
        </View>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <Animated.View 
            style={[
              styles.progressBarFill,
              { width: `${completionPercentage}%` }
            ]} 
          />
        </View>
      </View>
      
      {/* Tasks List */}
      <View style={styles.tasksList}>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            lang={lang}
            index={index}
            onPress={() => onTaskPress?.(task.id)}
          />
        ))}
      </View>
      
      {/* Footer Message */}
      {completedCount === totalTasks && (
        <View style={styles.completionBanner}>
          <Ionicons name="trophy" size={20} color={Colors.premium} />
          <Text style={styles.completionBannerText}>
            {lang === 'tr' 
              ? '🎉 Tüm görevleri tamamladın!' 
              : '🎉 All tasks completed!'}
          </Text>
        </View>
      )}
    </View>
  );
}

interface TaskItemProps {
  task: DailyTask;
  lang: 'tr' | 'en';
  index: number;
  onPress: () => void;
}

function TaskItem({ task, lang, index, onPress }: TaskItemProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  
  useEffect(() => {
    scale.value = withDelay(
      index * 100,
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    opacity.value = withDelay(
      index * 100,
      withSpring(1)
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });
  
  const title = lang === 'tr' ? task.titleTr : task.titleEn;
  const hasProgress = task.progress !== undefined && task.total !== undefined;
  
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          styles.taskItem,
          task.completed && styles.taskItemCompleted
        ]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={task.completed}
      >
        {/* Icon */}
        <View style={[
          styles.taskIcon,
          task.completed && styles.taskIconCompleted
        ]}>
          <Ionicons 
            name={task.completed ? 'checkmark' : task.icon} 
            size={20} 
            color={task.completed ? '#FFF' : Colors.primary} 
          />
        </View>
        
        {/* Content */}
        <View style={styles.taskContent}>
          <Text style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted
          ]}>
            {title}
          </Text>
          {hasProgress && !task.completed && (
            <Text style={styles.taskProgress}>
              {task.progress}/{task.total}
            </Text>
          )}
        </View>
        
        {/* XP Badge */}
        {!task.completed && (
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{task.xp}</Text>
          </View>
        )}
        
        {task.completed && (
          <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.darkText,
  },
  headerRight: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completionText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  tasksList: {
    gap: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 12,
    gap: 12,
  },
  taskItemCompleted: {
    opacity: 0.6,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskIconCompleted: {
    backgroundColor: Colors.success,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
    marginBottom: 2,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.lightText,
  },
  taskProgress: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.lightText,
  },
  xpBadge: {
    backgroundColor: Colors.warning + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.warning,
  },
  completionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.premium + '15',
    borderRadius: 10,
  },
  completionBannerText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.darkText,
  },
});
