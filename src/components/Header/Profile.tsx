import {Flex, Box, Text, Avatar} from '@chakra-ui/react'

interface ProfileProps{
  showProfileData: boolean;
}

export function Profile({showProfileData = true}:ProfileProps){
  return(
    <Flex
    align="center"
    >
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Alfredo Magalhães</Text>
          <Text color="gray.300" fontSize="small">
            alfredo.magalhaes@outlook.com
          </Text>
        </Box>
      )}
      
      <Avatar size="md" name="Alfredo Magalhaes" src="https://github.com/alfredomagalhaes.png"/>
    </Flex>
  );
}