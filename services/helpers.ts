interface IPaddingStyles {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}

export function padding(value: string): IPaddingStyles {

  const values = value.split(' ').map(v => parseInt(v || '0')); // Divide a string em valores e converte para número

  const paddingStyles: IPaddingStyles = {
    paddingTop: values[0],
    paddingRight: values[0],
    paddingBottom: values[0],
    paddingLeft: values[0],
  };

  // Define os estilos de padding com base nos valores fornecidos
  switch (values.length) {
    case 1:
      break;
    case 2:
      paddingStyles.paddingTop = values[0];
      paddingStyles.paddingRight = values[1];
      paddingStyles.paddingBottom = values[0];
      paddingStyles.paddingLeft = values[1];
      break;
    case 3:
      paddingStyles.paddingTop = values[0];
      paddingStyles.paddingRight = values[1];
      paddingStyles.paddingBottom = values[2];
      paddingStyles.paddingLeft = values[1];
      break;
    case 4:
      paddingStyles.paddingTop = values[0];
      paddingStyles.paddingRight = values[1];
      paddingStyles.paddingBottom = values[2];
      paddingStyles.paddingLeft = values[3];
      break;
    default:
      break;
  }

  return paddingStyles;
};

export const formatNumber = (n: number): string => {
  // Verifica se o argumento é um número válido
  if (typeof n !== 'number' || isNaN(n)) return 'NaN';

  // Arredonda o número para duas casas decimais
  const roundedNumber = n.toFixed(2);

  // Separa o número em partes inteiras e decimais
  const [integerPart, decimalPart] = roundedNumber.split('.');

  // Adiciona vírgulas para separar os milhares
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Retorna o número formatado
  return `${formattedIntegerPart}.${decimalPart}`;
};