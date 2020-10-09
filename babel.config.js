module.exports = api => {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ]

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '@clients': './src/app/clients',
          '@contracts': './src/app/contracts',
          '@services': './src/app/services',
          '@infra': './src/infra',
          '@utils': './src/utils',
          '@web': './src/web'
        }
      }
    ]
  ]

  const ignore = [
    'src/specs',
    'src/**/interfaces'
  ]

  return {
    presets,
    plugins,
    ignore
  }
}
