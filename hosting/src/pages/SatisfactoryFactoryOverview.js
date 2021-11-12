import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box, Container
} from '@material-ui/core';
import MaterialTable from '@material-table/core';

import GameSelect from 'components/satisfactoryfactories/GameSelect';
import useLocalStorage from 'hooks/useLocalStorage';
import useModalWithData from 'hooks/useModalWithData';
import { useAppCache } from 'modules/AppCache';
import recipes from 'data/recipes.json';

const SatisfactoryFactories = () => {
  const { values } = useAppCache();
  const { games, factories } = values;
  const [defaultGame, setDefaultGame] = useLocalStorage('defaultGame');
  const [selectedGame, setSelectedGame] = useState(defaultGame);

  const modal = useModalWithData();

  // if (gamesLoading) return (<></>);

  useEffect(() => {
    if (selectedGame) {
      setDefaultGame(selectedGame);
    }
  }, [selectedGame]);

  if (!selectedGame) return <>Create game first</>;

  // const gameObject = games?.find((game) => (game.id === selectedGame)) || {};

  const factoryList = [];
  factories?.forEach((singlefactory) => {
    singlefactory.recipes.forEach((singlerecipe) => {
      const recipeObject = recipes.find((recipesearch) => recipesearch.displayname === singlerecipe.name);
      const ingredients = recipeObject?.ingredients.map((ingredient) => {
        const total = ingredient.amount_min * singlerecipe.amount;
        return {
          ...ingredient,
          total
        };
      });
      const products = recipeObject?.products.map((product) => {
        const total = product.amount_min * singlerecipe.amount;
        return {
          ...product,
          total
        };
      });
      // const ingredientsText = recipeObject?.ingredients.map((oneingredient) => (`${oneingredient.product_name} is`)).join('-');
      const object = {
        ...singlefactory,
        ...singlerecipe,
        factory: singlefactory.name,
        machine: recipeObject.machine.displayname,
        ingredients,
        products
        // ingredientsText
      };

      console.log(999, recipeObject);
      factoryList.push(object);
    });
  });

  console.log(factoryList);

  const columns = [
    { title: 'Factory', field: 'factory' },
    { title: 'Factory ready', field: 'ready' },
    { title: 'Recipe', field: 'name' },
    { title: 'Amount', field: 'amount' },
    { title: 'Machine', field: 'machine' },
    { title: 'Ingredients', render: (rowData) => `${rowData.ingredients.map((ingredient) => (`${ingredient.product_name} (${rowData.amount} x ${ingredient.amount_min} = ${ingredient.total} pm)`))}` },
    { title: 'Output', render: (rowData) => `${rowData.products.map((ingredient) => (`${ingredient.product_name} (${rowData.amount} x ${ingredient.amount_min} = ${ingredient.total} pm)`))}` }
  ];

  return (
    <>
      <Helmet>
        <title>Factories | Satisfactory: FICSIT! Management Console</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <GameSelect selected={selectedGame} list={games} modal={modal} setSelectedGame={setSelectedGame} />
          {/* <MUIDataTable
            title="Employee List"
            data={data}
            columns={columns}
            options={options}
          /> */}
          <Box sx={{ pt: 3 }}>
            <MaterialTable columns={columns} data={factoryList} title="All recipes" />
            {/* <Card>

              {factories?.map((singlefactory) => {
                const test = true;
                return (
                  <>
                    <b>
                      {singlefactory.name}
                    </b>
                    <br />
                    {singlefactory.recipes?.map((factoryrecipe) => {
                      const test2 = true;
                      const recipeObject = recipes.find((recipesearch) => recipesearch.displayname === factoryrecipe.name);
                      // console.log(recipeObject, recipes);

                      return (
                        <>
                          {' '}
                          ---
                          {factoryrecipe.name}
                          {' '}
                          (
                          {factoryrecipe.amount}
                          {' '}
                          {recipeObject.machine.displayname}
                          )
                          <br />
                        </>
                      );
                    })}
                  </>
                );
              })}
            </Card> */}

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryFactories;
