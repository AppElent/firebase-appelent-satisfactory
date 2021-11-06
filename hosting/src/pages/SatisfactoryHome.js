import { Helmet } from 'react-helmet';
import {
  Box, Container, Card, CardHeader, Divider, CardContent
} from '@material-ui/core';
import { getAuth } from 'firebase/auth';
import MarkdownComponent from 'components/MarkdownComponent';

const SatisfactoryHome = () => {
  const auth = getAuth();
  console.log(auth);

  const homeText = `
  ### Intro
  *Note: This is a very early version of this website. Only a few features have been implemented. If you experience any issues or want to suggest a feature, please use the "Submit bug"
  button on the top.*  
  &nbsp;  
  &nbsp;  
  ### Games
  This is where people can create their game. For this part people need to be logged in.
  I need this information to store the games and factories you created. You can create an account for free.
  When you are starting a new game, or you want to play another game of Satisfactory with your friends,
  you can create your new game here, so you dont interfere with your old game.  
  &nbsp;  
  &nbsp;  
  ### Factories
  This is the place to create your Factories. Factories belong to a save game (of course) and you can create as many factories as you want.
  So, what is a factory? I will leave this one to you: if you think a factory is just 1 building, be my guest. It can also be an area of buildings combined.
  In a factory, we will add "Factory products/recipes", which basically means we add recipes to this factory.     
  For example lets create a factory called "My first iron factory".
  Then, we can create the following factory recipes: "Iron Ingot", "Iron Plate" and "Iron Rod".   
  &nbsp;  
  &nbsp;  
  ### Products
  This is just a generic products list with some extra juice. You will find basis statistics, as well as a flow diagram containing the default recipe.   
  &nbsp;  
  &nbsp;  
  ### Recipes
  This is just a generic recipe list with some extra juice. You will find basis statistics, as well as a flow diagram.     
  &nbsp;  
  &nbsp;  
  ### Buildables
  In this menu you will find everything you can build, like buildings, weapons, etc.     
  &nbsp;  
  &nbsp;  
  ### Settings
  In the settings menu you can alter your personal settings, or even delete your account.   
  `;

  return (
    <>
      <Helmet>
        <title>Games | Satisfactory: FICSIT! Management Console</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ pt: 3 }}>
            <Card>
              <CardHeader
                subheader="Subheader"
                title="Welcome to Satisfactory: FICSIT! Management Console"
              />
              <Divider />
              <CardContent>
                <MarkdownComponent>
                  {homeText}
                </MarkdownComponent>
              </CardContent>
            </Card>

          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SatisfactoryHome;
