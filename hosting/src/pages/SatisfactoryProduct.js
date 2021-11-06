import { Helmet } from 'react-helmet';
import {
  Accordion, AccordionSummary, AccordionDetails, Box, Container, Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import products from 'data/products.json';
import recipes from 'data/recipes.json';
import useAccordion from 'hooks/useAccordion';
import FlowDiagram from 'components/FlowDiagram';

const SatisfactoryProduct = () => {
  const params = useParams();
  const accordion = useAccordion('panel1');

  const id = parseInt(params.id, 10);

  const product = products.find((item) => item.id === id);

  const getOutputAmount = (productVar) => {
    const recipeObjectInside = recipes.find((recipe) => recipe.id === productVar.default_recipe.id);
    const productOutput = recipeObjectInside.products.find((prd) => prd.product_id === productVar.id);
    return productOutput.amount;
  };

  const position = { x: 0, y: 0 };
  const edgeType = 'smoothstep';
  const elements = [{
    id: `${product.id}`,
    type: 'output',
    data: { label: `${getOutputAmount(product)} x ${product.displayname}` },
    position,
  }];

  // const recipeObject = recipes.find((recipe) => recipe.id === product.default_recipe.id);
  // const { ingredients } = recipeObject;
  // ingredients.forEach((ingredient) => {
  //   const ingredientObject = products.find((singleproduct) => singleproduct.id === ingredient.product_id);
  //   elements.push({
  //     id: `${ingredientObject.id}`,
  //     data: { label: `${ingredientObject.displayname}` },
  //     position
  //   });
  //   elements.push({
  //     id: `${product.id}-${ingredient.product_id}`,
  //     source: `${ingredientObject.id}`,
  //     target: `${product.id}`,
  //     type: edgeType,
  //     animated: true,
  //     label: `${ingredient.amount}`
  //   });
  // });

  const isCoreProduct = (ingredientObject, nest) => {
    if (nest && ingredientObject.default_recipe && !(ingredientObject.default_recipe.displayname.startsWith('Unpackage') || ingredientObject.displayname === 'Water')) {
      return true;
    }
    return false;
  };

  const getFlowFromProduct = (productVar, nest = false) => {
    if (!productVar.default_recipe) return;
    const recipeObjectInside = recipes.find((recipe) => recipe.id === productVar.default_recipe.id);
    const { ingredients: ingredientss } = recipeObjectInside;
    // console.log('recipe', recipeObjectInside.displayname);
    ingredientss.forEach((ingredient) => {
      console.log('ingredient', ingredient.product_name);
      const ingredientObject = products.find((product2) => product2.id === ingredient.product_id);
      console.log('ingredientproduct', ingredientObject.displayname);
      const found = elements.some((el) => el.id === `${ingredientObject.id}`);
      if (!found) {
        let label = `${ingredientObject.displayname}`;
        if (isCoreProduct(ingredientObject, nest)) {
          label = `${getOutputAmount(ingredientObject)} x ${ingredientObject.displayname}`;
        }
        elements.push({
          id: `${ingredientObject.id}`,
          data: { label },
          position
        });
      }
      const found2 = elements.some((el) => el.id === `${productVar.id}-${ingredient.product_id}`);
      console.log(found2, productVar, ingredient);
      if (!found2) {
        elements.push({
          id: `${productVar.id}-${ingredient.product_id}`,
          source: `${ingredientObject.id}`,
          target: `${productVar.id}`,
          type: edgeType,
          animated: true,
          label: `${ingredient.amount}`
        });
      } else {
        console.log(999, productVar, ingredient);
      }

      if (isCoreProduct(ingredientObject, nest)) {
        if (nest) getFlowFromProduct(ingredientObject);
      }
    });
  };

  getFlowFromProduct(product, true);

  console.log(getFlowFromProduct(product));

  console.log('recipes without ingredient', recipes.filter((onerecipe) => onerecipe.ingredients.length === 0));

  console.log(elements);

  return (
    <>
      <Helmet>
        <title>
          {product.displayname}
          {' '}
          | Satisfactory: FICSIT! Management Console
        </title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Accordion expanded={accordion.expanded === 'panel1'} onChange={accordion.handleAccordionChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                General properties
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Statistics</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {product && JSON.stringify(product, null, 2)}
              {!product && <>No product found</>}
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={accordion.expanded === 'panel2'} onChange={accordion.handleAccordionChange('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Flow diagram
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>How its created using default recipes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FlowDiagram elementsPassed={elements} />
            </AccordionDetails>
          </Accordion>

        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryProduct;
