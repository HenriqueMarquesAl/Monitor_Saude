import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Importa a biblioteca de ícones

export default function App() {
  const [energia, setEnergia] = useState('');
  const [sono, setSono] = useState('');
  const [estresse, setEstresse] = useState('');
  const [mensagem, setMensagem] = useState('Por favor, insira seus níveis de saúde de 1 a 10 para receber dicas personalizadas.');

  function analisarSaude() {
    const nivelEnergia = parseInt(energia);
    const nivelSono = parseInt(sono);
    const nivelEstresse = parseInt(estresse);

    if (isNaN(nivelEnergia) || isNaN(nivelSono) || isNaN(nivelEstresse) ||
        nivelEnergia < 1 || nivelEnergia > 10 ||
        nivelSono < 1 || nivelSono > 10 ||
        nivelEstresse < 1 || nivelEstresse > 10) {
      Alert.alert('Erro', 'Por favor, insira valores numéricos de 1 a 10 para cada item.');
      return;
    }

    let novaMensagem = '';
    if (nivelEnergia >= 8 && nivelSono >= 8 && nivelEstresse <= 3) {
      novaMensagem = 'Parabéns! Você está com ótimos níveis de energia, sono e estresse. Continue com seus bons hábitos para manter o equilíbrio!';
    } else if (nivelSono <= 4 && nivelEnergia <= 4 && nivelEstresse >= 7) {
      novaMensagem = 'Seus níveis de energia e sono estão baixos, e o estresse está alto. Tente focar em um bom descanso, praticar meditação e reduzir o tempo de tela antes de dormir.';
    } else if (nivelSono <= 5) {
      novaMensagem = 'Sua qualidade de sono pode estar afetando sua energia. Considere estabelecer uma rotina de sono e evitar cafeína à noite.';
    } else if (nivelEstresse >= 6) {
      novaMensagem = 'Níveis altos de estresse podem ser prejudiciais. Reserve um tempo para relaxar, como praticar exercícios físicos ou passar um tempo na natureza.';
    } else if (nivelEnergia <= 5) {
      novaMensagem = 'Seu nível de energia está um pouco baixo. Que tal fazer uma caminhada curta ou garantir uma alimentação mais balanceada?';
    } else {
      novaMensagem = 'Ótimos resultados! Mantenha o foco em seus objetivos de saúde e bem-estar.';
    }

    setMensagem(novaMensagem);
  }

  function limparInputs() {
    setEnergia('');
    setSono('');
    setEstresse('');
    setMensagem('Por favor, insira seus níveis de saúde de 1 a 10 para receber dicas personalizadas.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Monitor de Bem-Estar</Text>
      <Text style={styles.textoExplicativo}>
        Preencha os campos para receber uma análise e dicas para a sua saúde.
      </Text>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <FontAwesome5 name="bolt" size={20} color="#3498db" style={styles.icon} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Nível de Energia</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 8"
              keyboardType="numeric"
              value={energia}
              onChangeText={setEnergia}
              maxLength={2}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome5 name="moon" size={20} color="#3498db" style={styles.icon} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Qualidade do Sono</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 6"
              keyboardType="numeric"
              value={sono}
              onChangeText={setSono}
              maxLength={2}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <FontAwesome5 name="heartbeat" size={20} color="#3498db" style={styles.icon} />
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Nível de Estresse</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 3"
              keyboardType="numeric"
              value={estresse}
              onChangeText={setEstresse}
              maxLength={2}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={analisarSaude} style={styles.button}>
          <Text style={styles.buttonText}>Analisar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={limparInputs} style={styles.buttonSecundario}>
          <Text style={styles.buttonTextSecundario}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feedbackBox}>
        <Text style={styles.feedbackText}>{mensagem}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A2B5B',
    marginBottom: 10,
  },
  textoExplicativo: {
    fontSize: 14,
    color: '#606C88',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#606C88',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#D1D9E6',
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#1A2B5B',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecundario: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#D1D9E6',
  },
  buttonTextSecundario: {
    color: '#606C88',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackBox: {
    width: '100%',
    backgroundColor: '#E6F0FF',
    borderRadius: 12,
    padding: 20,
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    color: '#1A2B5B',
  },
});