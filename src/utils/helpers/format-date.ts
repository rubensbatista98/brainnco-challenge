function formatDate(date: string) {
  return Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short'
  }).format(new Date(date));
}

export { formatDate };
