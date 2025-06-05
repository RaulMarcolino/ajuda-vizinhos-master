import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Modal, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [helpRequests, setHelpRequests] = useState([
    { name: 'Maria Silva', distance: '1.2 km', urgent: true, title: 'Preciso de remédios para minha mãe', description: 'Minha mãe está com febre e não posso sair de casa agora. Alguém pode buscar remédios na farmácia do bairro?' },
    { name: 'João Oliveira', distance: '0.5 km', urgent: false, title: 'Aulas de informática para idosos', description: 'Ofereço aulas gratuitas de informática básica para idosos do nosso bairro. Vamos nos conectar!' },
    { name: 'Ana Costa', distance: '0.8 km', urgent: false, title: 'Doação de roupas e cobertores', description: 'Estamos coletando roupas e cobertores para famílias carentes. Aceitamos doações em minha casa.' }
  ]);

  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'Outros',
  });

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmitRequest = () => {
    // Lógica de envio do pedido de ajuda
    if (newRequest.title && newRequest.description) {
      setHelpRequests([
        ...helpRequests,
        { name: 'Você', distance: '0 km', urgent: false, title: newRequest.title, description: newRequest.description },
      ]);
      setModalVisible(false);
      setNewRequest({ title: '', description: '', category: 'Outros' });
      Alert.alert('Sucesso!', 'Seu pedido de ajuda foi enviado com sucesso!');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
    }
  };

  const handleInputChange = (field, value) => {
    setNewRequest((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="help-circle-outline" size={30} color="white" />
          <Text style={styles.headerText}>Vizinho Amigo</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.profileIcon}>
            <Ionicons name="person-outline" size={20} color="white" />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Como podemos ajudar hoje?</Text>
          <Text style={styles.heroDescription}>Peça ajuda aos seus vizinhos ou ofereça seu apoio à comunidade</Text>
          <Button title="Novo Pedido de Ajuda" onPress={handleOpenModal} color="#4F46E5" />
        </View>

        {/* Feed de Pedidos */}
        <View style={styles.helpRequests}>
          {helpRequests.map((request, index) => (
            <View key={index} style={styles.helpRequest}>
              <View style={styles.helpRequestHeader}>
                <View style={styles.userInfo}>
                  <View style={styles.userIcon}>
                    <Ionicons name="person" size={20} color="blue" />
                  </View>
                  <View style={styles.userDetails}>
                    <Text style={styles.userName}>{request.name}</Text>
                    <Text style={styles.userDistance}>{request.distance}</Text>
                  </View>
                </View>
                {request.urgent && <Text style={styles.urgentTag}>Ajuda urgente</Text>}
              </View>
              <Text style={styles.helpRequestTitle}>{request.title}</Text>
              <Text style={styles.helpRequestDescription}>{request.description}</Text>
              <View style={styles.helpRequestFooter}>
                <View style={styles.helpRequestTags}>
                  <Text style={styles.tag}>Farmácia</Text>
                  <Text style={styles.tag}>Saúde</Text>
                </View>
                <Button title="Oferecer Ajuda" onPress={() => {}} color="#4F46E5" />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Novo Pedido */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Novo Pedido de Ajuda</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                placeholder="Título do Pedido"
                style={styles.input}
                value={newRequest.title}
                onChangeText={(text) => handleInputChange('title', text)}
              />
              <TextInput
                placeholder="Descrição"
                style={[styles.input, { height: 100 }]}
                multiline
                value={newRequest.description}
                onChangeText={(text) => handleInputChange('description', text)}
              />
              <Text style={styles.modalCategoryTitle}>Categoria</Text>
              <View style={styles.categoryButtons}>
                {['Compras', 'Transporte', 'Reparos', 'Saúde', 'Educação', 'Outros'].map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      newRequest.category === category && { backgroundColor: '#4F46E5' },
                    ]}
                    onPress={() => handleInputChange('category', category)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        newRequest.category === category && { color: 'white' },
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalFooter}>
                <Button title="Publicar Pedido" onPress={handleSubmitRequest} color="#4F46E5" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  heroSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 16,
  },
  helpRequests: {
    marginTop: 16,
  },
  helpRequest: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  helpRequestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 8,
  },
  userDetails: {
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
  },
  userDistance: {
    fontSize: 12,
    color: '#6c757d',
  },
  urgentTag: {
    backgroundColor: '#f8d7da',
    padding: 4,
    borderRadius: 16,
    color: '#721c24',
    fontSize: 12,
    fontWeight: 'bold',
  },
  helpRequestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  helpRequestDescription: {
    color: '#6c757d',
  },
  helpRequestFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpRequestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 16,
    fontSize: 12,
    color: '#6c757d',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 8,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
  },
  modalHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  modalCategoryTitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 8,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6c757d',
  },
  modalFooter: {
    marginTop: 16,
  },
});

export default Index;