import { CustomButtonProps } from '@/type';
import cn from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const CustomButton = ({
  onPress,
  title="Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false
}:CustomButtonProps) => {
  return (
    <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
      {leftIcon}
      <View className='flex-center flex-row'>
        {isLoading ? (
          <ActivityIndicator />
        ):(
          <Text></Text>
        )}
      </View>
      <Text className={cn('text-white-100 paragragh-semibold', textStyle)} >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton