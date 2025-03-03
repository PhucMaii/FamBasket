import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '@/components/CustomButton'
import { supabase } from '@/lib/supabase/config'

const Profile = () => {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Profile</Text>
      <CustomButton 
        title='Logout'
        containerStyles='w-full'
        onPress={async () => {
          await supabase.auth.signOut();
        }}
      />

    </View>
  )
}

export default Profile