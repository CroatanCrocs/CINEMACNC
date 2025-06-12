import { useEffect, useState } from 'react';
import { SpinWheel } from "react-spin-wheel"
import "react-spin-wheel/dist/index.css"
import * as Api from './api';
import { CategoryProvider, useCategoryContext } from './context';

function fromDate(): string {
  const today = new Date();

  return today.toISOString();
}

function toDate(): string {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = Sunday, 5 = Friday
  const daysUntilFriday = (5 + 7 - dayOfWeek) % 7;

  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  nextFriday.setHours(0, 0, 0, 0); // Set time to midnight
  return nextFriday.toISOString();
}

export function RoletaHeader() {
    const { selectedCategory } = useCategoryContext();
    return (
        <div className="flex flex-col items-center py-3 font-bold text-white text-3xl">
            <h1>Categoria da semana: <span className="text-[#a27f4f]">{selectedCategory?.name}</span></h1>
        </div>
    )
}

export function RoletaWheel() {
    const { selectedCategory, setSelectedCategory } = useCategoryContext();
      const [isSavingCategory, setIsSavingCategory] = useState(false);
      const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
      const [wheelSize, setWheelSize] = useState(300);
      const [textSize, setTextSize] = useState(14);
    
      // Função para calcular o tamanho do wheel baseado no viewport
      const calculateWheelSize = () => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        
        // Usa o menor valor entre largura e altura para garantir que caiba na tela
        const minDimension = Math.min(vw, vh);
        
        // Define o tamanho como 50% da menor dimensão, com mínimo de 300 e máximo de 600
        const size = Math.min(Math.max(minDimension * 0.5, 300), 600);
        
        // Calcula o tamanho do texto proporcional à roda
        const fontSize = Math.max(size * 0.04, 10);
        
        setWheelSize(size);
        setTextSize(fontSize);
      };
    
      // Efeito para recalcular o tamanho quando a tela for redimensionada
      useEffect(() => {
        calculateWheelSize();
        window.addEventListener('resize', calculateWheelSize);
        
        return () => {
          window.removeEventListener('resize', calculateWheelSize);
        };
      }, []);
    
      const handleSaveCategory = async (category: { id: number; name: string }) => {
        if (isSavingCategory) return;
    
        setIsSavingCategory(true);
        try {
          const payload = {
            category_id: category.id,
            from_date: fromDate(),
            to_date: toDate()
          };
    
          await Api.postCurrentCategory(payload);
        } catch (error) {
          console.error('Failed to post current category:', error);
        } finally {
          setIsSavingCategory(false);
        }
      };
    
      useEffect(() => {
        let mounted = true;
    
        async function loadCategory() {
          try {
            const data = await Api.fetchCurrentCategory();
            if (mounted) {
              setSelectedCategory({ id: data.ID, name: data.Name });
            }
          } catch (error) {
            console.error('Failed to load current category:', error);
          }
        }
        loadCategory();
    
        return () => {
          mounted = false;
        };
      }, []);
    
      useEffect(() => {
        let mounted = true;
    
        async function loadCategories() {
          try {
            const data = await Api.fetchCategories();
            if (mounted) {
              const formattedCategories = data.map((category: { ID: number; Name: string }) => ({
                id: category.ID,
                name: category.Name
              }));
              setCategories(formattedCategories); // Substitui o array inteiro ao invés de adicionar
            }
          } catch (error) {
            console.error('Failed to load categories:', error);
          }
        }
        loadCategories();
    
        return () => {
          mounted = false;
        };
      }, []);
        
      const handleSpinFinish = (result?: string | { name: string } | undefined) => {
        let name: string | undefined;
        if (typeof result === "string") {
          name = result;
        } else if (result && typeof result === "object" && "name" in result) {
          name = result.name;
        }
        if (name) {
          const category = categories.find(category => category.name === name);
          if (category) {
            setSelectedCategory(category);
            handleSaveCategory(category);
          }
        }
      }

    return (
        <div>
            <div className="justify-center items-center flex h-[70vh]">
                <SpinWheel
                    spinWheelStyle={{
                        fontSize: `${textSize}px`,
                        fontWeight: 'bold',
                        fontFamily: 'Arial, sans-serif'
                    }}
                    size={wheelSize}
                    items={categories.map(cat => cat.name)}
                    onFinishSpin={handleSpinFinish}
                />
            </div>
        </div>
    );
}

export default function Roleta() {
    return (
        <CategoryProvider>
            <div>
                <RoletaHeader />
                <RoletaWheel />
            </div>
        </CategoryProvider>
    );
}

