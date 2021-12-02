import { VStack } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import { Theme } from "@chakra-ui/theme";

export interface MainLayoutProps {
  children : React.ReactElement
}

export function MainLayout(props : MainLayoutProps) {

  const theme : Theme = useTheme();
  return (
    <VStack bgColor={theme.colors.gray[100]} minH="100vh">
      {props.children}
    </VStack>
  )
}