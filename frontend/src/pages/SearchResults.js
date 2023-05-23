import styled from "styled-components";
import Filters from "../components/Filters";
import ProductsList from "../components/ProductsList/ProductList";
import { useState } from "react";
import { Stack, Pagination, CircularProgress } from "@mui/material";
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
    `https://pricely.tech/api/Item/searchByName?${params}`
  );
  return response.json();
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchObj = Object.fromEntries(searchParams.entries());

    if (Object.entries(searchObj).length < 3) {
      setParams({
        searchResult: searchParams.get("searchResult") || null,
        categoryName: searchParams.get("categoryName") || null,
        priceFrom: searchParams.get("priceFrom") || "",
        PriceTo: searchParams.get("PriceTo") || "",
        isOnSale: searchParams.get("isOnSale") || false,
        isFoxtrot: searchParams.get("isFoxtrot") || false,
        isRozetka: searchParams.get("isRozetka") || false,
      });
    }

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

  return (
    <SearchResultsWrapper>
      <Filters
        onFilter={handleFilter}
        values={params}
        onCheckChange={handleCheckChange}
        onParamsChange={handleParamsChange}
      />
      {loading ? (
        <CircularProgress color="secondary" size={80} />
      ) : (
        <View
          page={
            searchParams.get("offset") != 0
              ? searchParams.get("offset") / (PER_PAGE * PER_ROW) + 1
              : 1
          }
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
    </Stack>
  );
};

export default SearchResults;
