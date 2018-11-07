import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Card } from './Card';
import { Button } from 'react-native-elements';
const Confirm = ({ children, visible, onAccept, onDecline, loading, loadingWithoutCount }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => { }}
        >
            <View style={styles.containerStyle}>
                <CardSection style={styles.cardSectionStyle}>
                    <Text style={styles.textStyle}>{children}</Text>
                </CardSection>
                <CardSection style={{justifyContent:'center'}}>
                    <Button
                        title='Da'
                        onPress={onAccept}
                        large={true}
                        loading={loading}
                        backgroundColor={'#1E6EC7'}
                    />
                    <Button onPress={onDecline}
                    title='Nu'
                    large={true}
                    loading={loadingWithoutCount}
                    backgroundColor={'#1E6EC7'}
                    />
                </CardSection>
            </View>
        </Modal>)
}
const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
}
export { Confirm };