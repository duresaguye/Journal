module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      ['react-native-vector-icons', { 'relativePath': './assets/fonts' }],
      'react-native-reanimated/plugin'
    ]
  };
};