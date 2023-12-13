*******
# 项目说明
...
*******

*******


## 新建

12月13日 6点

npm - 8.15.0

npx react-native@0.70.1 init CoScribe  --version 0.70.1

podfile ios 13

arch -x86_64 pod install --no-repo-update --verbose

yarn react-native run-ios --simulator "iPhone 11 Pro"     

 
*******

*******
 

## ios 相关

xCode 15

bug:
    unary_function  macro

    _LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION

    *******

    Showing Recent Messages
    /Users/work/Desktop/work/project/outsource/rn/CoScribe/ios/build/generated/ios/FBReactNativeSpec/FBReactNativeSpec.h:2218:88: 'value' is unavailable: introduced in iOS 12.0

        installer.pods_project.targets.each do |target|
            target.build_configurations.each do |config|
                config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.4'
            end
        end

*******

*******
 