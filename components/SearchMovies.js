import React, { useState, useMemo } from 'react';
import { FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Box, Text, VStack, Center, Button } from 'native-base';
import MovieItem from './MovieItem';

export default function SearchMovies() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(false);

    const handleSearch = () => {
        if (!searchTerm) {
            setError('Please enter a search term.');
            console.log('errer')
            return;
        }
        setIsLoading(true);
        setError(null);
        setSearch(true)
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4b4c21675emsh25a2d641c324102p11ac16jsn400919ab8d30',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };
        fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchTerm}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                setMovieData(data.results);

            })
            .catch(err => {
                console.error(err);

                setError('An error occurred while fetching the data. Please try again later.');

            })
            .finally(() => setIsLoading(false));
    };

    const renderMovieItem = useMemo(() => {
        return ({ item }) => {
            return <MovieItem item={item} />;
        };
    }, []);

    return (
        <Box flex={1} backgroundColor={'black'} >
            <Text color={'white'}>When the user submits the form, the API is called to search for the movie and display the results.</Text>
            <Box flexDirection={'row'} alignItems={'center'} alignSelf={'center'} my={5}>
                <TextInput
                    style={{ height: 40, width: 200, backgroundColor: 'white', marginRight: 10, padding: 5 }}
                    placeholder="Search movies"
                    onChangeText={(text) => {
                        setSearchTerm(text);
                        if (text === '') {
                            setSearch(false);
                        }
                    }}
                    value={searchTerm}
                />
                <Button onPress={handleSearch} backgroundColor={"lime.400"}>
                    <Text>Search</Text>
                </Button>
            </Box>
            <Center >
                {error && (
                    <Text color={"red.500"}>{error}</Text>
                )}
            </Center>
            {isLoading ? (
                <Center flex={1}>
                    <ActivityIndicator size="large" color="white" />
                </Center>
            ) : (
                <FlatList
                    data={movieData}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Center flex={1}>

                            {(search && movieData) && <Text color="white">No results found for "{searchTerm}"</Text>}

                        </Center>
                    }

                />
            )}
        </Box>
    );
}
