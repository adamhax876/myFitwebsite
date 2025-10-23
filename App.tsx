import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { MealPlanDisplay } from './components/MealPlanDisplay';
import { WorkoutPlanDisplay } from './components/WorkoutPlanDisplay';
import { generateMealPlan, generateWorkoutPlans } from './services/geminiService';
import { User, CalorieResults, MealPlan, WorkoutPlan } from './types';
import { T_EN, T_AR, DEFAULT_USER_DATA } from './constants';

type Language = 'en' | 'ar';
type Theme = 'light' | 'dark';
type AppState = 'calculator' | 'results' | 'generating' | 'plans';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('calculator');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  
  const [userData, setUserData] = useState<User | null>(null);
  const [calorieResults, setCalorieResults] = useState<CalorieResults | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  
  const [generationStatus, setGenerationStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const T = language === 'en' ? T_EN : T_AR;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);
  
  const handleCalculate = (data: User, results: CalorieResults) => {
    setUserData(data);
    setCalorieResults(results);
    setMealPlan(null);
    setWorkoutPlans([]);
    setAppState('results');
  };

  const handleRecalculate = () => {
    // Keep existing data to pre-fill the form
    setAppState('calculator');
  };

  const handleGeneratePlans = async () => {
    if (!userData || !calorieResults) return;

    setAppState('generating');
    setError(null);

    try {
      setGenerationStatus(T.generatingMealPlan);
      const mealPlanResult = await generateMealPlan(userData, calorieResults);
      
      setGenerationStatus(T.generatingWorkoutPlan);
      const workoutPlansResult = await generateWorkoutPlans(userData, calorieResults);
      
      setMealPlan(mealPlanResult);
      setWorkoutPlans(workoutPlansResult);
      setAppState('plans');
    } catch (err) {
        let errorMessage = "An unknown error occurred.";
        if (err instanceof Error) {
            errorMessage = err.message.includes("API key not valid") 
                ? "The API key is invalid. Please check your configuration in Vercel."
                : err.message;
        }
      setError(errorMessage);
      setAppState('results'); // Go back to results on error
    }
  };

  const renderContent = () => {
    switch(appState) {
        case 'calculator':
            return <CalculatorForm onCalculate={handleCalculate} T={T} language={language} existingData={userData || DEFAULT_USER_DATA} />;
        case 'results':
            return (
                <div className="space-y-8 animate-fade-in">
                    <ResultsDisplay results={calorieResults!} T={T} onRecalculate={handleRecalculate} />
                    <div className="text-center">
                        <button onClick={handleGeneratePlans} className="bg-secondary hover:bg-secondary-focus text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-secondary/40">
                            {T.generatePlans}
                        </button>
                    </div>
                </div>
            );
        case 'generating':
             return (
                 <div className="text-center p-8 bg-light-card dark:bg-dark-card rounded-2xl shadow-xl">
                     <h2 className="text-2xl font-bold text-primary mb-4">{T.generatingPlans}</h2>
                     <div className="flex justify-center items-center my-4">
                         <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                     </div>
                     <p>{generationStatus}</p>
                </div>
             );
        case 'plans':
            return (
                <div className="space-y-12">
                    {mealPlan && <MealPlanDisplay mealPlan={mealPlan} T={T} language={language} />}
                    {workoutPlans.length > 0 && <WorkoutPlanDisplay workoutPlans={workoutPlans} T={T} language={language}/>}
                     <div className="text-center pt-4">
                        <button onClick={handleRecalculate} className="bg-primary hover:bg-primary-focus text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/40">
                            {T.recalculate}
                        </button>
                    </div>
                </div>
            );
    }
  }

  return (
    <div className={`min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans transition-colors duration-300 ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <Header T={T} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">{error}</div>}
        
        {renderContent()}

      </main>
    </div>
  );
};

export default App;