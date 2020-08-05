# Conceitos React Native

## O que é React Native?

- Versão do React para desenvolvimento mobile
- Multiplataforma (Android e IOS)
- Podemos manipular cada plataforma de forma diferente (Cada plataforma agir de uma forma)
- Interface nativa ou hibrida?
  - Diferente do Ionic que gera um webview e transforma em aplicativo, perdendo performance e fazendo uso de interface hibrida o React faz uso de interface nativa, ou seja, comunica-se direto com a API do Android e IOS (interface nativa)
- React Native injeta uma dependencia chamada 'Javascript core' que permite que o celular entenda JS nativamente
- Portanto o código não é transpilado
- Empresas estão migrando suas aplicações para React Native
  - Microsoft está fazendo uso de React Native em algumas aplicações mobile

## Arquitetura

- O código é escrito em JS com JSX
- Após este código passa por uma ferramenta chamada 'Metro Bundler' (Packager) que gerará um "bundle.js", comparando à web, podemos dizer que seria o webpack do mobile
- Este bundle passa por uma 'bridge' que é a ponte de comunicação entre o JS e o código nativo
- Após isto, o que for necessário, é transformado em código nativo (Java e Objective-C)
<img src="Assets/arq-react-native.png">

## Sintaxe

- Declaração dos componentes (functions e classes) são iguais ao HTML
- Não utilizamos HTML (como na web permitia), necessitamos fazer uso de componentes do próprio React ou criar os nossos próprios
- Aplicamos estilo sem classes ou ID's
- Todo o texto é com o componente `<Text />` e este não possui estilização própria, ou seja, sempre que criado requer uma estilização
- Nenhum elemento tem estilo
- As StyleSheet são criadas dentro do JS, porém mantém uma semelhança de sintaxe com CSS, mudando principalmente o uso de hífen para camelCase 
  - Ex: `background-color: 'blue'` => `backgroundColor: 'blue'` 
     
   <img src="Assets/rn-example.png">

## Expo

- SDK com conjunto de funcionalidades prontas para utilizar (integrações, câmera, video, etc.)
- Não necessita emulador (contém aplicativo que facilita o desenvolvimento)

### Não vamos utilizar o Expo

- Caso necessário interagir e programar diretamente com código nativo, o Expo não permite
- Várias bibliotecas não tem suporte para o Expo
- O Expo liberou seu conjunto de ferramentas prontas para serem utilizadas com projetos que não utilizam Expo

## Configurando o Ambiente de Desenvolvimento (SDK)

- Vamos precisar instalar o SDK do Android e o XCode (só no MAC) para desenvolver para IOS
### Para IOS
- https://react-native.rocketseat.dev/ios/macos
### Para Android
- https://react-native.rocketseat.dev/android/linux/
