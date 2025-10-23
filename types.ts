export interface User {
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  goal: 'lose' | 'maintain' | 'gain';
  trainingLevel: 'beginner' | 'intermediate' | 'advanced';
  trainingFrequency: number;
  foodBudget?: number;
  budgetLevel?: 'low' | 'medium' | 'high';
  availableFoods?: string;
  dietaryRestrictions?: string;
}

export interface CalorieResults {
  bmr: number;
  maintenanceCalories: number;
  goalCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
}

export interface Meal {
  mealName_en: string;
  mealName_ar: string;
  ingredients_en: string[];
  ingredients_ar: string[];
  instructions_en: string;
  instructions_ar: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  quantity_description: string;
  estimatedPriceEGP: string;
}

export interface DailyMealPlan {
  day_en: string;
  day_ar: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  };
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MealPlan {
  planName_en: string;
  planName_ar: string;
  description_en: string;
  description_ar: string;
  dailyCalorieGoal: number;
  dailyMacroGoals: {
    protein: number;
    carbs: number;
    fat: number;
  };
  weeklySchedule: DailyMealPlan[];
}

export interface ExerciseAlternative {
    name: string;
    imageHint: string;
}

export interface Exercise {
  exerciseName: string;
  sets: string;
  reps: string;
  rest: string;
  videoHint: string;
  imageHint: string;
  instructions_en: string;
  instructions_ar: string;
  commonMistakes_en: string;
  commonMistakes_ar: string;
  alternatives: ExerciseAlternative[];
}

export interface DailyWorkout {
  day: string;
  targetMuscles: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  planName: string;
  description_en: string;
  description_ar: string;
  daySplit: string;
  weeklySchedule: DailyWorkout[];
}

// Fix: Add ProgressEntry and UserAccount types to resolve compilation errors.
export interface ProgressEntry {
  date: string; // YYYY-MM-DD
  weight: number;
}

export interface UserAccount extends User {
  uid: string;
  name: string;
  email: string;
  calorieResults: CalorieResults | null;
  mealPlan: MealPlan | null;
  workoutPlans: WorkoutPlan[];
  progress: ProgressEntry[];
  reportFrequency: 'never' | 'weekly' | 'bi-weekly' | 'monthly';
  lastReportDate: string | null;
}
