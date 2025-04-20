
import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Open Sans',
  },
  rtlPage: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Noto Sans Hebrew',
    direction: 'rtl',
    textAlign: 'right',
  },
  section: {
    marginBottom: 20,
    borderBottom: '1px solid #EEEEEE',
    paddingBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#1a365d',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#2c5282',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4a5568',
  },
  content: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  coverPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 20,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 40,
    textAlign: 'center',
  },
  image: {
    width: '80%',
    marginHorizontal: 'auto',
    marginBottom: 15,
    borderRadius: 5,
  },
  tableOfContents: {
    marginTop: 20,
    marginBottom: 30,
  },
  tocEntry: {
    fontSize: 12,
    marginBottom: 5,
    color: '#2d3748',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 10,
    color: '#718096',
  },
  rtlPageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    fontSize: 10,
    color: '#718096',
  },
});
