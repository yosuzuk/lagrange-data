import { useCallback, useState } from 'react';
import { IPage } from './types/IPage';

interface IUseNavigationResult {
    currentPage: IPage;
    setPage: (id: string) => void;
}

export const useNavigation = (pages: IPage[]): IUseNavigationResult => {
    if (pages.length === 0) {
        throw new Error('Need at least one page');
    }

    const [currentPage, setCurrentPage] = useState(pages[0]);

    const setPage = useCallback((id: string) => {
        const nextPage = pages.find(page => page.id === id);
        if (!nextPage) {
            throw new Error(`Invalid page id "${id}"`);
        }
        setCurrentPage(nextPage);
    }, [currentPage]);

    return {
        currentPage,
        setPage,
    };
};
