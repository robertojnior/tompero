class ExtractRecipesFromSearchResults {
  private results: any[]

  constructor(results: AsyncGeneratorFunction[]) {
    this.results = results
  }

  begin(): void {
    ''
  }

  async fetchRecipeGif(_recipeTitle: string): Promise<any> {
    ''
  }

  async complete(): Promise<any> {
    ''
  }
}

export default ExtractRecipesFromSearchResults
