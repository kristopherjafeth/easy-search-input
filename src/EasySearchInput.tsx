import React, { useState, useEffect, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { ReactComponent as SearchIcon } from './images/search.svg';
import ImageWithFallback from './utils/ImageWithFallback';
import { themes } from './themes';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: end;
`;

const Input = styled.input`
  font-size: 13px;
  width: 100%;
  max-width: 264px;
  border-radius: 4px;
  height: 29px;
  color: ${(props) => props.theme.inputTextColor};
  background-color: ${(props) => props.theme.inputBackgroundColor};
  padding-left: 10px;
`;

const SearchIconContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 1px;
  cursor: pointer;
`;

const ResultsContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
  position: absolute;
  background-color: ${(props) => props.theme.resultsBackgroundColor};
  width: 100%;
  top: 32px;
  border: 1px solid #7b8186;
  border-radius: 8px;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${(props) => props.theme.resultHoverBackgroundColor};
    color: ${(props) => props.theme.resultHoverTextColor};
  }
`;

const LoadingItem = styled.div`
  height: 35px;
  animation: pulse 1.5s infinite;
  cursor: pointer;
  font-size: 14px;
  padding: 8px;
  background-color: ${(props) => props.theme.loadingBackgroundColor};
  color: ${(props) => props.theme.loadingTextColor};
`;

interface EasySearchInputProps {
  themeName?: 'default' | 'sanimex';
}

const EasySearchInput: React.FC<EasySearchInputProps> = ({ themeName = 'default' }) => {
  interface Hit {
    brand: string;
    objectID: string;
    on_sale: boolean;
    images: string[];
    name: string;
    slug: string;
    price: string;
    sale_price: string;
    sku: string;
  }

  const router = useRouter();
  const q = router.query.q;
  const [search, setSearch] = useState<string>(q as string);
  const [results, setResults] = useState<Hit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isProducts = router.pathname === '/productos';

  const API_SEARCH_URL = process.env.NEXT_PUBLIC_API_SEARCH_URL || '';

  const onSearch = async () => {
    return router.replace({
      pathname: '/productos',
      query: {
        q: search,
      },
    });
  };

  const fetchSearchResults = useCallback(
    async (query: string) => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );
        const data = await response.json();
        console.log('datasearch', data);
        setResults(data || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [API_SEARCH_URL],
  );

  // Debounce para el input
  useEffect(() => {
    if (search) {
      const handler = setTimeout(() => {
        fetchSearchResults(search);
      }, 300); // Ajustar el tiempo si es necesario
      return () => clearTimeout(handler);
    } else {
      setResults([]);
    }
  }, [search, fetchSearchResults]);

  if (isProducts) return null;

  return (
    <ThemeProvider theme={themes[themeName]}>
      <Container>
        <Input
          value={search}
          placeholder="Busca por producto, marca o SKU"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              await onSearch();
              setSearch('');
            }
          }}
        />
        <SearchIconContainer>
          <SearchIcon
            onClick={async () => {
              await onSearch();
              setSearch('');
            }}
          />
        </SearchIconContainer>

        {search && (
          <ResultsContainer>
            {!loading ? (
              <div>
                {results.length > 0 ? (
                  results.map((result, i) => (
                    <ResultItem
                      key={i}
                      onClick={() => {
                        router.push(`/productos/${result.slug}`);
                        setSearch('');
                      }}
                    >
                      <div className="w-[50px] flex justify-center items-center h-full">
                        <div className="relative w-[40px] h-[40px]">
                          <ImageWithFallback
                            fill
                            style={{ objectFit: 'cover' }}
                            src={result.images[0]}
                            alt={result.name}
                            className="w-full h-full rounded-md overflow-hidden"
                          />
                        </div>
                      </div>
                      <div className="w-full h-full leading-[15px]">
                        {result.name}
                      </div>
                    </ResultItem>
                  ))
                ) : (
                  <div className="p-2">
                    <p>No se encontraron resultados</p>
                  </div>
                )}
              </div>
            ) : (
              <LoadingItem>Cargando...</LoadingItem>
            )}
          </ResultsContainer>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default EasySearchInput;