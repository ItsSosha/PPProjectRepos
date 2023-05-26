import styled from "styled-components";
import Filters from "../components/Filters";
import ProductsList from "../components/ProductsList/ProductList";
import { useState } from "react";
import { Stack, Pagination, CircularProgress, Typography } from "@mui/material";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const SearchResultsWrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 32px;
`;

const PER_ROW = 4;
const PER_PAGE = 2;

const fetchProducts = async (paramsObj) => {
  const params = createSearchParams(paramsObj);
  const response = await fetch(
    `https://pricely.tech/api/Item/${paramsObj.searchResult ? "searchByName" : "filterByCategory"}?${params}`
  );
  return response.json();
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchObj = Object.fromEntries(searchParams.entries());

    setParams({
      searchResult: searchParams.get("searchResult") || null,
      categoryName: searchParams.get("categoryName") || null,
      priceFrom: parseInt(searchParams.get("priceFrom")) || "",
      PriceTo: parseInt(searchParams.get("PriceTo")) || "",
      isOnSale: searchParams.get("isOnSale") === 'true' || false,
      isFoxtrot: searchParams.get("isFoxtrot") === 'true' || false,
      isRozetka: searchParams.get("isRozetka") === 'true' || false,
    });

    setLoading(true);
    fetchProducts({
      ...searchObj,
      offset: searchParams.get("offset"),
      limit: PER_PAGE * PER_ROW,
    }).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [searchParams]);

  const handleParamsChange = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckChange = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setSearchParams(prevParams => ({
      ...Object.fromEntries(Object.entries(params).filter((param) => param[1])),
      offset: 0
    })
    );
  };

  const handlePageChange = (page) => {
    setSearchParams((prevSearchParams) => ({
      ...Object.fromEntries(prevSearchParams.entries()),
      offset: (page - 1) * PER_ROW * PER_PAGE,
    }));
  };

  const handleFiltersReset = () => {
    const query = searchParams.get('searchResult') ? 'searchResult' : 'categoryName';
    setSearchParams(prevSearchParams => ({
      offset: 0,
      [query]: searchParams.get(query)
    }))
  }

  return (
    <SearchResultsWrapper>
      <Filters
        onFilter={handleFilter}
        values={params}
        onCheckChange={handleCheckChange}
        onParamsChange={handleParamsChange}
        onFiltersReset={handleFiltersReset}
      />
      {loading ? (
        <CircularProgress color="secondary" size={80} />
      ) : (
        <View
          page={searchParams.get("offset") / (PER_PAGE * PER_ROW) + 1}
          products={products}
          onPageChange={handlePageChange}
        />
      )}
    </SearchResultsWrapper>
  );
};

const View = ({ products, page, onPageChange }) => {
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      {products.total ? (
        <>
          <ProductsList
          itemsPerRow={4}
          rows={2}
          data={products.result}
          page={page}
          />
        <Pagination
          count={Math.ceil(products.total / (PER_PAGE * PER_ROW))}
          page={page}
          onChange={(e, value) => onPageChange(value)}
          sx={{
            "& .MuiPagination-ul": {
              justifyContent: "center",
            },
            "& .MuiPaginationItem-root": {
              fontWeight: "700",
              fontSize: "1rem",
            },
            "& .Mui-selected": {
              textDecoration: "underline",
              backgroundColor: "transparent",
            },
          }}
          />
        </>
      ) : (
        <Typography
          component="h4"
          variant="h4">
            На жаль, жоден продукт не був знайдений за вашим запитом.
        </Typography>
      )}
    </Stack>
  );
};

export default SearchResults;
