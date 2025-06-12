import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import * as Api from './api'; // Adjust the import path as necessary

interface Category {
    id: number;
    name: string;
}

interface CategoryContextType {
    selectedCategory: Category | null;
    setSelectedCategory: (category: Category | null) => void;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export function useCategoryContext() {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategoryContext must be used within a CategoryProvider');
    }
    return context;
}

export function CategoryProvider({ children }: { children: ReactNode }) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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

    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}
