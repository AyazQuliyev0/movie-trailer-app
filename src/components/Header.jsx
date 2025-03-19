import React, { useState } from 'react';

const Header = ({ onSearch, onSort, onSortRating }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    }

    const handleSort = (e) => {
        onSort(e.target.value);
    }

    const handleSortRating = (e) => {
        onSortRating(e.target.value);
    }

    return (
        <header style={styles.header}>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>Popular Movies</h1>
            </div>

            <div style={styles.controls}>
                {/* Axtarış */}
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleSearch} 
                    placeholder='Search' 
                    style={styles.search} 
                />

                {/* Sort */}
                <select onChange={handleSort} style={styles.sort}>
                    <option value="desc">By date (newest first)</option>
                    <option value="asc">By date (oldest first)</option>
                </select>

                {/* Sort by rating */}
                <select onChange={handleSortRating} style={styles.sortR}>
                    <option value="desc">The Best</option>
                    <option value="asc">The Worst</option>
                </select>
            </div>
        </header>
    )
}

const styles = {
    header: {
      backgroundColor: "#333",
      color: "white",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    titleContainer: {
      marginBottom: "20px",
    },

    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
    },

    controls: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    search: {
      padding: "10px",
      marginRight: "10px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      fontSize: "1rem",
    },

    sort: {
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      fontSize: "1rem",
    },

    sortR: {
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        outline: "none",
        fontSize: "1rem",
        margin: "0px 0px 0px 10px",
      },
};

export default Header;
