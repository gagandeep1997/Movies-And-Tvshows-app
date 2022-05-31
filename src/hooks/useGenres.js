const useGenres = (selectedGenre) => {
    if(selectedGenre.length < 1) return '';
    
    const genresId = selectedGenre.map(genre => genre.id);
    return genresId.reduce((prev , current) => prev + ',' + current);
}

export default useGenres;