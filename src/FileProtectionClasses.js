const protectionClasses = {
  NSFileProtectionComplete: 1,
  NSFileProtectionCompleteUnlessOpen: 2,
  NSFileProtectionCompleteUntilFirstUserAuthentication: 3,
  NSFileProtectionNone: 4,
  'NSFileProtectionRecover?': 5,
  kSecAttrAccessibleWhenUnlocked: 6,
  kSecAttrAccessibleAfterFirstUnlock: 7,
  kSecAttrAccessibleAlways: 8,
  kSecAttrAccessibleWhenUnlockedThisDeviceOnly: 9,
  kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly: 10,
  kSecAttrAccessibleAlwaysThisDeviceOnly: 11,
};

export default protectionClasses;
